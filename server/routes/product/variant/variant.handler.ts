import { and, count, eq, like, or, sql } from "drizzle-orm";
import type { GetProductsWithVariants, GetProductWithVariants, CreateProductWithVariants, UpdateProductWithVariants } from "./variant.routes";
import { db } from "../../../db";
import type { HonoRouteHandler } from "../../../lib/types";
import { insertProductSchema, products, selectProductSchema, updateProductSchema } from "../../../db/schema/products.model";
import { insertProductVariantSchema, productVariants, selectProductVariantSchema, updateProductVariantSchema } from "../../../db/schema/product-variants.model";
import { CustomHTTPException } from "../../../lib/custom-error";

export const getProductWithVariants: HonoRouteHandler<GetProductWithVariants> = async (c) => {
  const { id } = c.req.valid("query");
  const userId = c.get("user")?.id ?? "";

  const product = await db.query.products.findFirst({
    with: {
      variants: {
        extras: {
          price: sql`cast (${productVariants.price} as text)`.as("price"),
        },
      },
    },
    where: and(eq(products.sellerId, userId), eq(products.id, Number(id))),
  });

  if (!product) {
    throw new CustomHTTPException(404, { code: "PRODUCT_NOT_FOUND", message: "Product not found" });
  }

  const selectProductWithVariantsSchema = selectProductSchema.extend({
    variants: selectProductVariantSchema.array(),
  });

  const validatedResult = selectProductWithVariantsSchema.parse(product);
  const { sellerId: _, ...dataWithoutIds } = validatedResult;

  return c.json(
    {
      data: {
        product: dataWithoutIds,
      },
    },
    200
  );
};

export const getProductsWithVariants: HonoRouteHandler<GetProductsWithVariants> = async (c) => {
  const query = c.req.valid("query");
  const userId = c.get("user")?.id ?? "";

  const page = Number(query.page ?? 1);
  const limit = Number(query.limit ?? 10);
  const offset = (page - 1) * limit;

  const whereCondition = or(
    eq(products.sellerId, userId),
    query.search ? or(like(products.title, `%${query.search}%`), like(products.description, `%${query.search}%`)) : undefined
  );

  const [totalCountResult, productsResult] = await db.transaction(async (tx) => {
    const [{ count: totalCount }] = await tx.select({ count: count() }).from(products).where(whereCondition);

    const productList = await tx.query.products.findMany({
      with: {
        variants: {
          extras: {
            price: sql`cast (${productVariants.price} as text)`.as("price"),
          },
        },
      },
      where: whereCondition,
      orderBy: (products, { asc, desc }) =>
        query.order === "asc" ? asc(products[query.sort as keyof typeof products]) : desc(products[query.sort as keyof typeof products]),
      limit,
      offset,
    });

    return [totalCount, productList];
  });

  const selectProductWithVariantsSchema = selectProductSchema.extend({
    variants: selectProductVariantSchema.array(),
  });

  const validatedResult = selectProductWithVariantsSchema.array().parse(productsResult);

  const result = validatedResult.map(({ sellerId: _, ...rest }) => rest);

  return c.json(
    {
      data: {
        products: result,
        meta: {
          total: totalCountResult,
          page,
          limit,
          pages: Math.ceil(totalCountResult / limit),
        },
      },
    },
    200
  );
};

export const createProductWithVariants: HonoRouteHandler<CreateProductWithVariants> = async (c) => {
  const data = c.req.valid("json");
  const userId = c.get("user")?.id ?? "";

  const insertProductWithVariantsSchema = insertProductSchema.extend({
    variants: insertProductVariantSchema.array(),
  });

  const { success, data: parsedData } = await insertProductWithVariantsSchema.safeParseAsync({
    data,
    sellerId: userId,
  });

  if (!success) {
    throw new CustomHTTPException(400, { code: "BAD_REQUEST", message: "Invalid data, please check the data" });
  }

  const [insertedProduct] = await db.insert(products).values(parsedData).returning();

  if (!insertedProduct) {
    throw new CustomHTTPException(500, { code: "INSERT_FAILED", message: "Failed to insert new product" });
  }

  const selectProductWithVariantsSchema = selectProductSchema.extend({
    variants: selectProductVariantSchema.array(),
  });

  const validatedResult = selectProductWithVariantsSchema.parse(insertedProduct);
  const { sellerId: _, ...dataWithoutIds } = validatedResult;

  return c.json(
    {
      data: {
        status: true,
        product: dataWithoutIds,
      },
    },
    200
  );
};

export const updateProductWithVariants: HonoRouteHandler<UpdateProductWithVariants> = async (c) => {
  const { id, ...data } = c.req.valid("json");
  const userId = c.get("user")?.id ?? "";

  const updateProductWithVariantsSchema = updateProductSchema.extend({
    variants: updateProductVariantSchema.array(),
  });

  const { success, data: parsedData } = await updateProductWithVariantsSchema.safeParseAsync({
    data,
    sellerId: userId,
  });

  if (!success) {
    throw new CustomHTTPException(400, { code: "BAD_REQUEST", message: "Invalid data, please check the data" });
  }

  const [updatedProduct] = await db.update(products).set(parsedData).where(eq(products.id, id)).returning();

  if (!updatedProduct) {
    throw new CustomHTTPException(404, { code: "PRODUCT_NOT_FOUND", message: "Product not found" });
  }

  return c.json(
    {
      data: {
        status: true,
      },
    },
    200
  );
};
