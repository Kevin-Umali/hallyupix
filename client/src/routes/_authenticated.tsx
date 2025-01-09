import AppSidebar from "@/components/custom/sidebar/app-sidebar";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getSessionQueryOptions } from "@/lib/queries/auth.queries";

import { createFileRoute, Outlet, redirect, useLocation } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const { queryClient } = context;

    const session = await queryClient.ensureQueryData(getSessionQueryOptions());

    const isAuthenticated = !!session.data?.user;

    if (!isAuthenticated) {
      throw redirect({
        to: "/sign-in",
        search: {
          redirect: location.href,
        },
      });
    }

    return {
      auth: {
        isAuthenticated,
        user: session.data?.user,
      },
    };
  },
  component: () => {
    const { auth } = Route.useRouteContext();
    const location = useLocation();

    const segments = location.pathname.replace(/\/$/, "").split("/").filter(Boolean);
    const breadcrumbItems = segments.map((segment, index) => ({
      label: segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()),
      path: "/" + segments.slice(0, index + 1).join("/"),
      isLast: index === segments.length - 1,
    }));

    return (
      <SidebarProvider
        style={
          {
            "--sidebar-width": "305px",
          } as React.CSSProperties
        }
        defaultOpen={false}
      >
        <AppSidebar user={auth?.user} />
        <SidebarInset>
          <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4 z-50">
            <SidebarTrigger className="-ml-1" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbItems.map(({ label, path, isLast }) => (
                  <BreadcrumbItem key={path}>
                    {isLast ? <BreadcrumbPage>{label}</BreadcrumbPage> : <BreadcrumbLink>{label}</BreadcrumbLink>}
                    {!isLast && <BreadcrumbSeparator />}
                  </BreadcrumbItem>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  },
});
