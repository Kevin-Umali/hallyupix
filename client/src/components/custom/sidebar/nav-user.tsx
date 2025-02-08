import { BadgeCheck, ChevronsUpDown, HelpCircle, Loader2, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { Session } from "@/lib/api";
import { useSignOutMutation } from "@/lib/mutation/auth.mutation";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

interface NavUserProps {
  user: Session["user"] | undefined;
}

const NavUser: React.FC<NavUserProps> = ({ user }) => {
  const { isMobile } = useSidebar();

  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync: signOut, isPending: isSigningOut } = useSignOutMutation();

  const handleSignOut = async () => {
    await signOut(undefined, {
      onSuccess: () => {
        queryClient.clear();
        router.invalidate();
      },
    });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground md:h-8 md:p-0">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user?.image ?? ""} alt={user?.name} />
                <AvatarFallback className="rounded-lg">{user?.name[0]}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user?.name}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.image ?? ""} alt={user?.name} />
                  <AvatarFallback className="rounded-lg">{user?.name[0]}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <HelpCircle />
                Help Center
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BadgeCheck />
                Verify My Account
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleSignOut()} disabled={isSigningOut}>
              {isSigningOut ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <>
                  <LogOut />
                  Log out
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

NavUser.displayName = "NavUser";

export default NavUser;
