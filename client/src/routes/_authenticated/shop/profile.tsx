import ShopProfileSettings from "@/components/custom/shop/profile/profile";
import { getShopProfileQueryOptions } from "@/lib/queries/shop.queries";
import { createImageData } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/shop/profile")({
  loader: async ({ context }) => {
    const result = await context.queryClient.ensureQueryData(getShopProfileQueryOptions());

    return {
      shopProfile: result,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const data = Route.useLoaderData();

  return (
    <ShopProfileSettings
      initialData={{
        shopName: data?.shopProfile?.shopName,
        description: data?.shopProfile?.description ?? "",
        bannerImage: createImageData(data?.shopProfile?.bannerImage),
        profileImage: createImageData(data?.shopProfile?.profileImage),
        socialLinks: data?.shopProfile?.socialLinks ?? {},
        isVerified: data?.shopProfile?.isVerified ?? false,
      }}
    />
  );
}
