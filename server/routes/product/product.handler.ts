import { eq } from "drizzle-orm";
import { db } from "../../db";
import { insertProductSchema, products, selectProductSchema, updateProductSchema } from "../../db/schema/products.model";
import { CustomHTTPException } from "../../lib/custom-error";
import type { HonoRouteHandler } from "../../lib/types";
import type { SaveProduct, UpdateProduct } from "./product.routes";

export const saveProduct: HonoRouteHandler<SaveProduct> = async (c) => {
  const data = c.req.valid("json");
  const userId = c.get("user")?.id ?? "";

  const { success, data: parsedData } = await insertProductSchema.safeParseAsync({
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

  const validatedResult = selectProductSchema.parse(insertedProduct);
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

export const updateProduct: HonoRouteHandler<UpdateProduct> = async (c) => {
  const { id, ...data } = c.req.valid("json");
  const userId = c.get("user")?.id ?? "";

  const { success, data: parsedData } = await updateProductSchema.safeParseAsync({
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
