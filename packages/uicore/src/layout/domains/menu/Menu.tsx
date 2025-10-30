import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuIcon,
  SidebarMenuLabel,
} from '@hai3/uikit';
import { useAppSelector } from '@/core/hooks/useRedux';
import { navigateToScreen } from '../../../core/actions';
import { iconService } from '@/core/icons/iconService';

export interface MenuProps {}

/**
 * Menu Domain - Uses tailored shadcn sidebar components
 * Composes shadcn primitives with Redux state management
 * Purely presentational - responds to user clicks only
 * Initial navigation handled by AppRouter (default route)
 */
export const Menu: React.FC<MenuProps> = () => {
  const { items, collapsed, visible } = useAppSelector((state) => state.menu);
  const selectedScreen = useAppSelector((state) => state.layout.selectedScreen);

  if (!visible) return null;

  return (
    <Sidebar collapsed={collapsed}>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => {
            const icon = iconService.get(item.icon || '');
            const isActive = selectedScreen === item.id;

            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  isActive={isActive}
                  tooltip={item.label}
                  onClick={() => navigateToScreen(item.id)}
                >
                  {icon && <SidebarMenuIcon>{icon}</SidebarMenuIcon>}
                  <SidebarMenuLabel>{item.label}</SidebarMenuLabel>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

Menu.displayName = 'Menu';
