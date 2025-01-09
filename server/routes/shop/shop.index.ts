import { createRouter } from "../../lib/create-app";

import * as shopRoutes from "./shop.routes";
import * as shopHandler from "./shop.handler";

const router = createRouter()
  .openapi(shopRoutes.saveShopProfile, shopHandler.saveShopProfile)
  .openapi(shopRoutes.getShopProfile, shopHandler.getShopProfile)
  .openapi(shopRoutes.updateShopProfileImage, shopHandler.updateShopProfileImage);

export default router;
