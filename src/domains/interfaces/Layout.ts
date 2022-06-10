import { LayoutTypes } from "../enums/LayoutTypes";
import { SkinTypes } from "../enums/SkinTypes";
import { RouterTransitionTypes } from "../enums/RouterTransitionTypes";
import { ContentWidthTypes } from "../enums/ContentWidthTypes";
import { MenuLayout } from "./MenuLayout";
import { NavbarLayout } from "./NavbarLayout";
import { ToastPosition } from "react-hot-toast";
import { FooterLayout } from "./FooterLayout";

export interface Layout {
  isRTL: boolean;
  skin: SkinTypes;
  routerTransition: RouterTransitionTypes;
  type: LayoutTypes;
  contentWidth: ContentWidthTypes;
  menu: MenuLayout;
  navbar: NavbarLayout;
  footer: FooterLayout;
  customizer?: boolean;
  scrollTop?: boolean;
  toastPosition?: ToastPosition;
  lastLayout?: LayoutTypes;
}
