import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Session } from "@/lib/api";
import { ACRONYM_APP_NAME, APP_NAME, NAV_ITEMS } from "@/constant";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import DesktopMenuItem from "@/components/custom/sidebar/desktop-menu-item";
import MobileMenuItem from "@/components/custom/sidebar/mobile-menu-item";
import NavUser from "@/components/custom/sidebar/nav-user";
import SubNavigation from "@/components/custom/sidebar/sub-nav";
import { NavItem } from "@/components/custom/sidebar/types";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: Session["user"] | undefined;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ user, ...props }) => {
  const [activeMain, setActiveMain] = useState<NavItem>(NAV_ITEMS[0]);
  const { isMobile, setOpen, setOpenMobile } = useSidebar();

  const handleMainSelect = (item: NavItem) => {
    setActiveMain(item);
    if (item?.to && isMobile) {
      setOpen(false);
      setOpenMobile(false);
    } else if (item && item.subItems.length <= 0) {
      setOpen(false);
      setOpenMobile(false);
    } else {
      setOpen(true);
      setOpenMobile(true);
    }
  };

  const handleSubSelect = () => {
    if (isMobile) {
      setOpen(false);
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar collapsible="icon" className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row" {...props}>
      {/* Icon Sidebar */}
      <Sidebar collapsible="none" className={cn("!w-[var(--sidebar-width-icon)] flex flex-col border-r")}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="h-8 p-0">
                <Link to="/dashboard" activeProps={{ className: "text-primary" }} activeOptions={{ exact: true }}>
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    {ACRONYM_APP_NAME}
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{APP_NAME}</span>
                    <span className="truncate text-xs">K-pop Shop</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent className="flex-1">
          <SidebarGroup>
            <SidebarGroupContent className={cn("px-1.5 md:px-0")}>
              <SidebarMenu>
                {NAV_ITEMS.map((item) =>
                  isMobile ? (
                    <MobileMenuItem key={item.title} item={item} activeItem={activeMain} onSelectMain={handleMainSelect} onSelectSub={handleSubSelect} />
                  ) : (
                    <DesktopMenuItem key={item.title} item={item} onSelect={handleMainSelect} />
                  )
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="mt-auto border-t">
          <NavUser user={user} />
        </SidebarFooter>
      </Sidebar>

      {/* Desktop Sub Navigation */}
      {!isMobile && <SubNavigation activeMain={activeMain} onSelectSub={handleSubSelect} />}
    </Sidebar>
  );
};

AppSidebar.displayName = "AppSidebar";

export default AppSidebar;
