import { createRouter } from "../../lib/create-app";

import * as shopRoutes from "./shop.routes";
import * as shopHandler from "./shop.handler";

const router = createRouter()
  .openapi(shopRoutes.saveShopProfile, shopHandler.saveShopProfile)
  .openapi(shopRoutes.getShopProfile, shopHandler.getShopProfile)
  .openapi(shopRoutes.updateShopProfileImage, shopHandler.updateShopProfileImage)
  .openapi(shopRoutes.getShopPayment, shopHandler.getShopPayment)
  .openapi(shopRoutes.saveShopPaymentInstructions, shopHandler.saveShopPaymentInstructions)
  .openapi(shopRoutes.saveShopPaymentDeadlineSettings, shopHandler.saveShopPaymentDeadlineSettings)
  .openapi(shopRoutes.saveShopPaymentPolicies, shopHandler.saveShopPaymentPolicies)
  .openapi(shopRoutes.saveShopPaymentMethods, shopHandler.saveShopPaymentMethods)
  .openapi(shopRoutes.getShopShipping, shopHandler.getShopShipping)
  .openapi(shopRoutes.saveShopShippingMethod, shopHandler.saveShopShippingMethod)
  .openapi(shopRoutes.saveShopShippingProcessingTimes, shopHandler.saveShopShippingProcessingTimes)
  .openapi(shopRoutes.saveShopShippingPolicies, shopHandler.saveShopShippingPolicies)
  .openapi(shopRoutes.saveShopShippingCustomPolicies, shopHandler.saveShopShippingCustomPolicies);

export default router;
