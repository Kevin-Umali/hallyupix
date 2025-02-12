import { and, count, eq, like, or, sql } from "drizzle-orm";
import type { GetProductsWithVariants, GetProductWithVariants } from "./variant.routes";
import { db } from "../../../db";
import type { HonoRouteHandler } from "../../../lib/types";
import { products, selectProductSchema } from "../../../db/schema/products.model";
import { productVariants, selectProductVariantSchema } from "../../../db/schema/product-variants.model";
import { CustomHTTPException } from "../../../lib/custom-error";

export const getProductWithVariants: HonoRouteHandler<GetProductWithVariants> = async (c) => {
  const { id } = c.req.valid("query");
  const userId = c.get("user")?.id ?? "";

  const product = await db.query.products.findFirst({
    extras: {
      fee: sql`cast (${products.fee} as text)`.as("fee"),
    },
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
      extras: {
        fee: sql`cast (${products.fee} as text)`.as("fee"),
      },
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
