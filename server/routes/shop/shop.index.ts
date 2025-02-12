import { createRouter } from "../../lib/create-app";

import profileRoutes from "./profile/profile.index";
import paymentRoutes from "./payment/payment.index";
import shippingRoutes from "./shipping/shipping.index";

const router = createRouter().route("/profile", profileRoutes).route("/payment", paymentRoutes).route("/shipping", shippingRoutes);

export default router;
