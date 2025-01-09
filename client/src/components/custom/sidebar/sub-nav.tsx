import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import type { NavItem } from "@/components/custom/sidebar/types";
import { Link } from "@tanstack/react-router";

interface SubNavigationProps {
  activeMain: NavItem;
  onSelectSub: () => void;
}

const SubNavigation = ({ activeMain, onSelectSub }: SubNavigationProps) => {
  if (!activeMain.subItems.length) return null;

  return (
    <Sidebar collapsible="none" className="w-64 flex-shrink-0">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <activeMain.icon className="size-5" />
          <div className="text-base font-medium text-foreground">{activeMain.title}</div>
        </div>
        <div className="text-xs text-muted-foreground mt-1">{activeMain.description}</div>
      </SidebarHeader>

      <SidebarContent className="h-[calc(100vh-var(--header-height))] overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupContent className="p-2">
            <SidebarMenu>
              {activeMain.subItems.map((subItem) => (
                <SidebarMenuItem key={subItem.title}>
                  <Link to={subItem.to} activeOptions={{ exact: true }}>
                    {({ isActive }) => (
                      <SidebarMenuButton onClick={onSelectSub} className="flex items-center gap-2 p-2" isActive={isActive}>
                        <subItem.icon className="size-4" />
                        <span className="font-medium">{subItem.title}</span>
                      </SidebarMenuButton>
                    )}
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

SubNavigation.displayName = "SubNavigation";

export default SubNavigation;
