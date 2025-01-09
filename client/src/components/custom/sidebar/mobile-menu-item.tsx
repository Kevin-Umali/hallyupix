import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@radix-ui/react-collapsible";
import { SidebarMenuItem, SidebarMenuButton, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton } from "@/components/ui/sidebar";
import type { NavItem } from "@/components/custom/sidebar/types";

interface MobileMenuItemProps {
  item: NavItem;
  activeItem: NavItem;
  onSelectMain: (item: NavItem) => void;
  onSelectSub: () => void;
}

const MobileMenuItem = ({ item, activeItem, onSelectMain, onSelectSub }: MobileMenuItemProps) => {
  const mainButton = (isActive?: boolean) => (
    <SidebarMenuButton className="flex items-center w-full px-2" isActive={isActive}>
      <item.icon className="size-4" />
      <span className="flex-1">{item.title}</span>
      {item.subItems.length > 0 && <ChevronRight className="size-4 ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />}
    </SidebarMenuButton>
  );

  return (
    <Collapsible asChild defaultOpen={item.title === activeItem.title} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger className="w-full" onClick={() => onSelectMain(item)}>
          {item.to ? (
            <Link to={item.to} activeOptions={{ exact: true }}>
              {({ isActive }) => mainButton(isActive)}
            </Link>
          ) : (
            mainButton()
          )}
        </CollapsibleTrigger>

        {item.subItems.length > 0 && (
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.subItems.map((subItem) => (
                <SidebarMenuSubItem key={subItem.title}>
                  <Link to={subItem.to} activeOptions={{ exact: true }}>
                    {({ isActive }) => (
                      <SidebarMenuSubButton onClick={onSelectSub} isActive={isActive}>
                        <subItem.icon className="size-4" />
                        <span>{subItem.title}</span>
                      </SidebarMenuSubButton>
                    )}
                  </Link>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        )}
      </SidebarMenuItem>
    </Collapsible>
  );
};

MobileMenuItem.displayName = "MobileMenuItem";

export default MobileMenuItem;
