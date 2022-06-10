import { ToastPosition } from 'react-hot-toast';
import { LayoutTypes } from '../domains/enums/LayoutTypes';
import { ThemeConfig } from '../domains/interfaces/ThemeConfig';
import { SkinTypes } from '../domains/enums/SkinTypes';
import { RouterTransitionTypes } from '../domains/enums/RouterTransitionTypes';
import { ContentWidthTypes } from '../domains/enums/ContentWidthTypes';
import { NavbarLayoutTypes } from '../domains/enums/NavbarLayoutTypes';
import { FooterLayoutTypes } from '../domains/enums/FooterLayoutTypes';

const toastPosition: ToastPosition = 'top-right';

const themeConfig: ThemeConfig = {
  app: {
    appName: 'Vuexy',
    appLogoImage: require('../../src/assets/images/logo/logo.svg').default,
  },
  layout: {
    isRTL: false,
    // light, dark, bordered, semi-dark
    skin: SkinTypes.light,
    // fadeIn, fadeInLeft, zoomIn, none or check this
    // for more transition https://animate.style/
    routerTransition: RouterTransitionTypes.fadeIn,
    type: LayoutTypes.vertical, // vertical, horizontal
    contentWidth: ContentWidthTypes.boxed, // full, boxed
    menu: {
      isHidden: false,
      isCollapsed: false,
    },
    navbar: {
      // ? For horizontal menu, navbar type will work for navMenu type
      type: NavbarLayoutTypes.floating, // static , sticky , floating, hidden
      backgroundColor: 'white', // BS color options [primary, success, etc]
    },
    footer: {
      type: FooterLayoutTypes.static, // static, sticky, hidden
    },
    customizer: false,
    scrollTop: true, // Enable scroll to top button
    toastPosition,
  },
};

export default themeConfig;
