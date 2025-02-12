import { createRouter } from "../../../lib/create-app";

import * as profileRoutes from "./profile.routes";
import * as profileHandler from "./profile.handler";

const router = createRouter()
  .openapi(profileRoutes.getShopProfile, profileHandler.getShopProfile)
  .openapi(profileRoutes.saveShopProfile, profileHandler.saveShopProfile)
  .openapi(profileRoutes.updateShopProfileImage, profileHandler.updateShopProfileImage);

export default router;
