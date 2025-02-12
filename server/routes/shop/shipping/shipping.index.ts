import { createRouter } from "../../../lib/create-app";

import * as shippingRoutes from "./shipping.routes";
import * as shippingHandler from "./shipping.handler";

const router = createRouter()
  .openapi(shippingRoutes.getShopShipping, shippingHandler.getShopShipping)
  .openapi(shippingRoutes.saveShopShippingMethod, shippingHandler.saveShopShippingMethod)
  .openapi(shippingRoutes.saveShopShippingProcessingTimes, shippingHandler.saveShopShippingProcessingTimes)
  .openapi(shippingRoutes.saveShopShippingPolicies, shippingHandler.saveShopShippingPolicies)
  .openapi(shippingRoutes.saveShopShippingCustomPolicies, shippingHandler.saveShopShippingCustomPolicies);

export default router;
