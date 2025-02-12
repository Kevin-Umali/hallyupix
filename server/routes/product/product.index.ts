import { createRouter } from "../../lib/create-app";

import * as productRoutes from "./product.routes";
import * as productHandler from "./product.handler";

const router = createRouter().openapi(productRoutes.saveProduct, productHandler.saveProduct).openapi(productRoutes.updateProduct, productHandler.updateProduct);

export default router;
