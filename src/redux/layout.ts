import { createSlice } from '@reduxjs/toolkit';
import themeConfig from '../configs/themeConfig';
import { Layout } from '../domains/interfaces/Layout';
import { MenuLayout } from '../domains/interfaces/MenuLayout';

const initialMenu = (): MenuLayout => {
  const item = window.localStorage.getItem('menuCollapsed');
  //* * Parse stored json or if none return initialValue
  const menuCollapsed = item ? JSON.parse(item) : themeConfig.layout.menu.isCollapsed;
  return {
    isCollapsed: menuCollapsed,
    isHidden: themeConfig.layout.menu.isHidden,
  };
};

const initialDirection = () => {
  const item = window.localStorage.getItem('direction');
  //* * Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : themeConfig.layout.isRTL;
};

const initialSkin = () => {
  const item = window.localStorage.getItem('skin');
  //* * Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : themeConfig.layout.skin;
};

const initialState: Layout = {
  skin: initialSkin(),
  isRTL: initialDirection(),
  type: themeConfig.layout.type,
  lastLayout: themeConfig.layout.type,
  menu: initialMenu(),
  footer: {
    type: themeConfig.layout.footer.type,
  },
  navbar: {
    type: themeConfig.layout.navbar.type,
    backgroundColor: themeConfig.layout.navbar.backgroundColor,
  },
  contentWidth: themeConfig.layout.contentWidth,
  routerTransition: themeConfig.layout.routerTransition,
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    handleRTL: (state: Layout, action: any) => {
      state.isRTL = action.payload;
      window.localStorage.setItem('direction', JSON.stringify(action.payload));
    },
    handleSkin: (state: Layout, action: any) => {
      state.skin = action.payload;
      window.localStorage.setItem('skin', JSON.stringify(action.payload));
    },
    handleLayout: (state: Layout, action: any) => {
      state.type = action.payload;
    },
    handleFooterType: (state: Layout, action: any) => {
      state.footer.type = action.payload;
    },
    handleNavbarType: (state: Layout, action: any) => {
      state.navbar.type = action.payload;
    },
    handleMenuHidden: (state: Layout, action: any) => {
      state.menu.isHidden = action.payload;
    },
    handleLastLayout: (state: Layout, action: any) => {
      state.lastLayout = action.payload;
    },
    handleNavbarColor: (state: Layout, action: any) => {
      state.navbar.backgroundColor = action.payload;
    },
    handleContentWidth: (state: Layout, action: any) => {
      state.contentWidth = action.payload;
    },
    handleMenuCollapsed: (state: Layout, action: any) => {
      state.menu.isCollapsed = action.payload;
      window.localStorage.setItem(
          'menuCollapsed',
          JSON.stringify(action.payload),
      );
    },
    handleRouterTransition: (state: Layout, action: any) => {
      state.routerTransition = action.payload;
    },
  },
});

export const {
  handleRTL,
  handleSkin,
  handleLayout,
  handleLastLayout,
  handleMenuHidden,
  handleNavbarType,
  handleFooterType,
  handleNavbarColor,
  handleContentWidth,
  handleMenuCollapsed,
  handleRouterTransition,
} = layoutSlice.actions;

export default layoutSlice.reducer;
