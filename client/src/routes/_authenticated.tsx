import AppSidebar from "@/components/custom/sidebar/app-sidebar";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getSessionQueryOptions } from "@/lib/queries";

import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

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

    return (
      <SidebarProvider
        style={
          {
            "--sidebar-width": "305px",
          } as React.CSSProperties
        }
      >
        <AppSidebar user={auth?.user} />
        <SidebarInset>
          <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
            <SidebarTrigger className="-ml-1" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">All Inboxes</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Inbox</BreadcrumbPage>
                </BreadcrumbItem>
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
