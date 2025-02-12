import { createRouter } from "../../../lib/create-app";

import * as paymentRoutes from "./payment.routes";
import * as paymentHandler from "./payment.handler";

const router = createRouter()
  .openapi(paymentRoutes.getShopPayment, paymentHandler.getShopPayment)
  .openapi(paymentRoutes.saveShopPaymentInstructions, paymentHandler.saveShopPaymentInstructions)
  .openapi(paymentRoutes.saveShopPaymentDeadlineSettings, paymentHandler.saveShopPaymentDeadlineSettings)
  .openapi(paymentRoutes.saveShopPaymentPolicies, paymentHandler.saveShopPaymentPolicies)
  .openapi(paymentRoutes.saveShopPaymentMethods, paymentHandler.saveShopPaymentMethods);

export default router;
