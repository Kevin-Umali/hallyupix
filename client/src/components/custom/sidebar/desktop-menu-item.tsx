import { Link } from "@tanstack/react-router";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import type { NavItem } from "@/components/custom/sidebar/types";

interface DesktopMenuItemProps {
  item: NavItem;
  onSelect: (item: NavItem) => void;
}

const DesktopMenuItem = ({ item, onSelect }: DesktopMenuItemProps) => {
  if (item.to) {
    return (
      <SidebarMenuItem>
        <Link to={item.to} activeOptions={{ exact: true }}>
          {({ isActive }) => (
            <SidebarMenuButton
              tooltip={{
                children: item.title,
                hidden: false,
              }}
              onClick={() => onSelect(item)}
              className="px-2"
              isActive={isActive}
            >
              <item.icon className="size-4" />
              <span>{item.title}</span>
            </SidebarMenuButton>
          )}
        </Link>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        tooltip={{
          children: item.title,
          hidden: false,
        }}
        onClick={() => onSelect(item)}
        className="px-2"
      >
        <item.icon className="size-4" />
        <span>{item.title}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

DesktopMenuItem.displayName = "DesktopMenuItem";

export default DesktopMenuItem;
