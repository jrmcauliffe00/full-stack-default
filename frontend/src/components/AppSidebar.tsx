
import { Home, Star, User } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { ThemeToggle } from './ThemeToggle';

// Navigation items
const navItems = [
  {
    title: 'Home',
    url: '#home',
    icon: Home,
    id: 'home'
  },
  {
    title: 'My Items',
    url: '#my-items',
    icon: Star,
    id: 'my-items'
  },
];

// Admin item (conditionally shown)
const adminItem = {
  title: 'Admin',
  url: '#admin',
  icon: User,
  id: 'admin'
};

interface AppSidebarProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  isAdmin?: boolean;
}

export function AppSidebar({ currentSection, onSectionChange, isAdmin = true }: AppSidebarProps) {
  const allItems = isAdmin ? [...navItems, adminItem] : navItems;

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">⚡</span>
          </div>
          <span className="font-bold text-xl text-primary">FastAPI</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {allItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={currentSection === item.id}
                    className="cursor-pointer"
                  >
                    <div onClick={() => onSectionChange(item.id)}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
            <span className="text-sm text-muted-foreground">admin@example.com</span>
          </div>
          <ThemeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
