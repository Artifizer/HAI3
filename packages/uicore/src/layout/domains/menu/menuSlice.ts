import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { LayoutDomains } from '@/core/layout/layoutSlice';

/**
 * Menu slice for managing menu state and configuration
 * MenuItem type is defined here (vertical slice approach)
 */

export interface MenuItem {
  id: string;
  label: string;
  icon?: string; // Icon identifier - resolved via iconService
  href?: string;
  onClick?: () => void;
  children?: MenuItem[];
  badge?: string | number;
}

export interface MenuState {
  collapsed: boolean;
  items: MenuItem[];
  visible: boolean;
}

const initialState: MenuState = {
  collapsed: false,
  items: [],
  visible: true,
};

const menuSlice = createSlice({
  name: LayoutDomains.Menu,
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.collapsed = !state.collapsed;
    },
    setMenuCollapsed: (state, action: PayloadAction<boolean>) => {
      state.collapsed = action.payload;
    },
    setMenuItems: (state, action: PayloadAction<MenuItem[]>) => {
      state.items = action.payload;
    },
    setMenuVisible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
    setMenuConfig: (state, action: PayloadAction<Partial<MenuState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { toggleMenu, setMenuCollapsed, setMenuItems, setMenuVisible, setMenuConfig } = menuSlice.actions;
export default menuSlice.reducer;
