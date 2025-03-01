import { createRouter } from "../../../lib/create-app";

import * as variantRoutes from "./variant.routes";
import * as variantHandler from "./variant.handler";

const router = createRouter()
  .openapi(variantRoutes.getProductsWithVariants, variantHandler.getProductsWithVariants)
  .openapi(variantRoutes.getProductWithVariants, variantHandler.getProductWithVariants)
  .openapi(variantRoutes.createProductWithVariants, variantHandler.createProductWithVariants)
  .openapi(variantRoutes.updateProductWithVariants, variantHandler.updateProductWithVariants);

export default router;
