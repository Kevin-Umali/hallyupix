import type { HonoRouteHandler } from "../../lib/types";
import { v2 as cloudinary } from "cloudinary";
import type { CloudinarySignedURL, DeleteUserCloudinaryAssets } from "./cloudinary.routes";
import { CustomHTTPException } from "../../lib/custom-error";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: process.env.NODE_ENV === "production",
});

export const getCloudinarySignedUploadURL: HonoRouteHandler<CloudinarySignedURL> = async (c) => {
  const userId = c.get("user")?.id;
  const timestamp = new Date().getTime();

  const signature = await cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder: `hallyupix/${userId}`,
    },
    process.env.CLOUDINARY_API_SECRET
  );

  if (!signature) {
    throw new CustomHTTPException(500, {
      code: "CLOUDINARY_FAILED_TO_GENERATE_SIGNATURE",
      message: "Failed to generate signature",
    });
  }

  return c.json(
    {
      data: {
        timestamp,
        folder: `hallyupix/${userId}`,
        signature,
        url: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      },
    },
    200
  );
};

export const deleteUserCloudinaryAssets: HonoRouteHandler<DeleteUserCloudinaryAssets> = async (c) => {
  const { publicId } = c.req.valid("json");

  const result = await cloudinary.uploader.destroy(publicId, { resource_type: "image" });

  if (result?.result !== "ok") {
    throw new CustomHTTPException(404, {
      code: "CLOUDINARY_ASSET_NOT_FOUND",
      message: "Cloudinary asset not found",
    });
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
