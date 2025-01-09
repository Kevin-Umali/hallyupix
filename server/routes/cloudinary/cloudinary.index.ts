import { createRouter } from "../../lib/create-app";

import * as cloudinaryRoutes from "./cloudinary.routes";
import * as cloudinaryHandlers from "./cloudinary.handler";

const router = createRouter()
  .openapi(cloudinaryRoutes.cloudinarySignedURL, cloudinaryHandlers.getCloudinarySignedUploadURL)
  .openapi(cloudinaryRoutes.deleteUserCloudinaryAssets, cloudinaryHandlers.deleteUserCloudinaryAssets);

export default router;
