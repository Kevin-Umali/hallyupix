import { useState } from "react";
import {
  Package,
  ShoppingCart,
  Settings,
  Store,
  Boxes,
  Clock,
  CreditCard,
  Bell,
  UserCircle,
  Gauge,
  FileText,
  ListTodo,
  Tag,
  Wallet,
  BoxesIcon,
  ClipboardList,
  Command,
  TrendingUp,
  Truck,
  BadgeCheck,
  Users,
  ScrollText,
  LayoutTemplate,
  ShieldCheck,
  Image as ImageIcon,
  FileStack,
  Receipt,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import NavUser from "@/components/custom/sidebar/nav-user";
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Session } from "@/lib/api";
import { APP_NAME } from "@/constant";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@radix-ui/react-collapsible";

const navItems = [
  {
    title: "Orders",
    url: "/orders",
    icon: ShoppingCart,
    description: "Track and manage customer orders",
    subItems: [
      { title: "All Orders", url: "/orders", icon: ListTodo },
      { title: "Pre-orders", url: "/orders/pre-orders", icon: Clock },
      { title: "Payment Verifications", url: "/orders/payments", icon: CreditCard },
      { title: "Order Status", url: "/orders/status", icon: ClipboardList },
      { title: "Shipping Management", url: "/orders/shipping", icon: Truck },
    ],
  },
  {
    title: "Products",
    url: "/products",
    icon: Package,
    description: "Manage your product inventory",
    subItems: [
      { title: "Inventory", url: "/products/inventory", icon: Boxes },
      { title: "Pre-order Items", url: "/products/pre-orders", icon: Clock },
      { title: "Categories", url: "/products/categories", icon: Tag },
      { title: "Price Management", url: "/products/pricing", icon: Wallet },
      { title: "Media Library", url: "/products/media", icon: ImageIcon },
    ],
  },
  {
    title: "Status Flows",
    url: "/status-flows",
    icon: LayoutTemplate,
    description: "Customize order status workflows",
    subItems: [
      { title: "Flow Templates", url: "/status-flows/templates", icon: FileStack },
      { title: "Status Rules", url: "/status-flows/rules", icon: ScrollText },
      { title: "Tracking Setup", url: "/status-flows/tracking", icon: TrendingUp },
    ],
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: Receipt,
    description: "View shop performance metrics",
    subItems: [
      { title: "Sales Overview", url: "/analytics/sales", icon: TrendingUp },
      { title: "Inventory Analysis", url: "/analytics/inventory", icon: BoxesIcon },
      { title: "Customer Stats", url: "/analytics/customers", icon: Users },
    ],
  },
  {
    title: "Shop",
    url: "/shop",
    icon: Store,
    description: "Manage your shop profile",
    subItems: [
      { title: "Shop Profile", url: "/shop/profile", icon: FileText },
      { title: "Verification", url: "/shop/verification", icon: BadgeCheck },
    ],
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    description: "Configure account settings",
    subItems: [
      { title: "General", url: "/settings/general", icon: Gauge },
      { title: "Profile", url: "/settings/profile", icon: UserCircle },
      { title: "Notifications", url: "/settings/notifications", icon: Bell },
      { title: "Security", url: "/settings/security", icon: ShieldCheck },
    ],
  },
];

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: Session["user"] | undefined;
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: Session["user"] | undefined;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ user, ...props }) => {
  const [activeMain, setActiveMain] = useState(navItems[0]);
  const [activeSub, setActiveSub] = useState(navItems[0].subItems[0]);
  const { isMobile } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row" {...props}>
      {/* Icon Sidebar */}
      <Sidebar collapsible="none" className={cn("!w-[var(--sidebar-width-icon)] flex flex-col border-r")}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="h-8 p-0">
                <a href="/">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{APP_NAME}</span>
                    <span className="truncate text-xs">K-pop Shop</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent className="flex-1">
          <SidebarGroup>
            {isMobile ? (
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <Collapsible key={item.title} asChild defaultOpen={item.title === activeMain.title} className="group/collapsible">
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton isActive={activeMain.title === item.title} className="flex items-center w-full px-2">
                            <item.icon className="size-4" />
                            <span className="flex-1">{item.title}</span>
                            <ChevronRight className="size-4 ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.subItems.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton onClick={() => setActiveSub(subItem)} isActive={activeSub.title === subItem.title}>
                                  <subItem.icon className="size-4" />
                                  <span>{subItem.title}</span>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            ) : (
              <SidebarGroupContent className="px-1.5 md:px-0">
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        tooltip={{
                          children: item.title,
                          hidden: false,
                        }}
                        onClick={() => {
                          setActiveMain(item);
                          setActiveSub(item.subItems[0]);
                        }}
                        isActive={activeMain.title === item.title}
                        className="px-2"
                      >
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            )}
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="mt-auto border-t">
          <NavUser user={user} />
        </SidebarFooter>
      </Sidebar>

      {/* Desktop Sub Navigation Sidebar */}
      {!isMobile && (
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
                      <SidebarMenuButton
                        onClick={() => setActiveSub(subItem)}
                        isActive={activeSub.title === subItem.title}
                        className="flex items-center gap-2 p-2"
                      >
                        <subItem.icon className="size-4" />
                        <span className="font-medium">{subItem.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Section-Specific Stats stay the same */}
          </SidebarContent>
        </Sidebar>
      )}
    </Sidebar>
  );
};

AppSidebar.displayName = "AppSidebar";

export default AppSidebar;
