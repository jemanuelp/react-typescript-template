import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleContentWidth, handleMenuHidden } from "../../redux/layout";
import classnames from "classnames";
import { ArrowUp } from "react-feather";
import { Button, Navbar, NavItem } from "reactstrap";
import themeConfig from "../../configs/themeConfig";
import Customizer from "../../@core/components/customizer";
import ScrollToTop from "../../@core/components/scrolltop";
import NavbarComponent from "./components/navbar";
import FooterComponent from "./components/footer";
import MenuComponent from "./components/menu/horizontal-menu";
import { useRTL } from "../../utility/hooks/useRTL";
import { useLayout } from "../../utility/hooks/useLayout";
import { useNavbarType } from "../../utility/hooks/useNavbarType";
import { useFooterType } from "../../utility/hooks/useFooterType";
import { useNavbarColor } from "../../utility/hooks/useNavbarColor";
import { useRouterTransition } from "../../utility/hooks/useRouterTransition";
import "../scss/base/core/menu/menu-types/horizontal-menu.scss";
import { useSkin } from "../../utility/hooks/useSkin";
import { RootState } from "../../redux/reducers/RootReducer";
import { NavbarLayoutTypes } from "../../domains/enums/NavbarLayoutTypes";

const HorizontalLayout = (props: any) => {
  // ** Props
  const { navbar, menuData, footer, children, menu } = props;

  const { skin, setSkin } = useSkin();
  const { isRtl, setIsRtl } = useRTL();
  const { navbarType, setNavbarType } = useNavbarType();
  const { footerType, setFooterType } = useFooterType();
  const { navbarColor, setNavbarColor } = useNavbarColor();
  const { layout, setLayout, setLastLayout } = useLayout();
  const { transition, setTransition } = useRouterTransition();

  // ** States
  const [isMounted, setIsMounted] = useState(false);
  const [navbarScrolled, setNavbarScrolled] = useState<boolean>(false);

  // ** Store Vars
  const dispatch = useDispatch();
  const layoutStore = useSelector((state: RootState) => state.layout);

  // ** Vars
  const contentWidth = layoutStore.contentWidth;
  const isHidden = layoutStore.menu.isHidden;

  // ** Handles Content Width
  const setContentWidth = (val: any) => dispatch(handleContentWidth(val));

  // ** Handles Content Width
  const setIsHidden = (val: any) => dispatch(handleMenuHidden(val));

  // ** UseEffect Cleanup
  const cleanup = () => {
    setIsMounted(false);
    setNavbarScrolled(false);
  };

  //** ComponentDidMount
  useEffect(() => {
    setIsMounted(true);
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 65 && !navbarScrolled) {
        setNavbarScrolled(true);
      }
      if (window.pageYOffset < 65) {
        setNavbarScrolled(false);
      }
    });
    return () => cleanup();
  }, []);

  // ** Vars
  const footerClasses = {
    static: "footer-static",
    sticky: "footer-fixed",
    hidden: "footer-hidden",
  };

  const navbarWrapperClasses = {
    floating: "navbar-floating",
    sticky: "navbar-sticky",
    static: "navbar-static",
  };

  const navbarClasses = {
    floating:
      contentWidth === "boxed" ? "floating-nav container-xxl" : "floating-nav",
    sticky: "fixed-top",
  };

  const bgColorCondition =
    navbarColor !== "" && navbarColor !== "light" && navbarColor !== "white";

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={classnames(`wrapper horizontal-layout horizontal-menu 
        ${
          navbarWrapperClasses[
            navbarType === NavbarLayoutTypes.hidden
              ? NavbarLayoutTypes.floating
              : navbarType
          ] || "navbar-floating"
        } 
        ${footerClasses[footerType] || "footer-static"} menu-expanded`)}
      {...(isHidden ? { "data-col": "1-column" } : {})}
    >
      <Navbar
        expand="lg"
        container={false}
        className={classnames(
          "header-navbar navbar-fixed align-items-center navbar-shadow navbar-brand-center",
          {
            "navbar-scrolled": navbarScrolled,
          }
        )}
      >
        {!navbar && (
          <div className="navbar-header d-xl-block d-none">
            <ul className="nav navbar-nav">
              <NavItem>
                <Link to="/" className="navbar-brand">
                  <span className="brand-logo">
                    <img src={themeConfig.app.appLogoImage} alt="logo" />
                  </span>
                  <h2 className="brand-text mb-0">{themeConfig.app.appName}</h2>
                </Link>
              </NavItem>
            </ul>
          </div>
        )}

        <div className="navbar-container d-flex content">
          {navbar ? (
            navbar({ skin, setSkin })
          ) : (
            <NavbarComponent skin={skin} setSkin={setSkin} />
          )}
        </div>
      </Navbar>
      {!isHidden ? (
        <div className="horizontal-menu-wrapper">
          <Navbar
            tag="div"
            expand="sm"
            light={skin !== "dark"}
            dark={skin === "dark" || bgColorCondition}
            className={classnames(
              `header-navbar navbar-horizontal navbar-shadow menu-border`,
              {
                [navbarClasses[
                  navbarType === NavbarLayoutTypes.floating ||
                  navbarType === NavbarLayoutTypes.sticky
                    ? navbarType
                    : NavbarLayoutTypes.floating
                ]]: navbarType !== "static",
                "floating-nav":
                  ((navbarType === NavbarLayoutTypes.floating ||
                  navbarType === NavbarLayoutTypes.sticky
                    ? navbarType
                    : NavbarLayoutTypes.floating) &&
                    navbarType !== "static") ||
                  navbarType === "floating",
              }
            )}
          >
            {
              // menu ? menu({menuData, routerProps, currentActiveItem}) :
              <MenuComponent menuData={menuData} />
            }
          </Navbar>
        </div>
      ) : null}

      {children}
      {themeConfig.layout.customizer === true ? (
        <Customizer
          skin={skin}
          isRTL={isRtl}
          type={layout}
          navbar={{ type: navbarType, backgroundColor: navbarColor }}
          menu={{ isHidden, isCollapsed: false }}
          contentWidth={contentWidth}
          footer={{ type: footerType }}
          routerTransition={transition}
          setSkin={setSkin}
          setIsRtl={setIsRtl}
          setLayout={setLayout}
          setIsHidden={setIsHidden}
          setLastLayout={setLastLayout}
          setTransition={setTransition}
          setNavbarType={setNavbarType}
          setFooterType={setFooterType}
          setNavbarColor={setNavbarColor}
          setContentWidth={setContentWidth}
        />
      ) : null}
      <footer
        className={classnames(
          `footer footer-light ${footerClasses[footerType] || "footer-static"}`,
          {
            "d-none": footerType === "hidden",
          }
        )}
      >
        {footer ? (
          footer
        ) : (
          <FooterComponent
            footerType={footerType}
            footerClasses={footerClasses}
          />
        )}
      </footer>

      {themeConfig.layout.scrollTop === true ? (
        <div className="scroll-to-top">
          <ScrollToTop showOffset={300} className={"scroll-top d-block"}>
            <Button className="btn-icon" color="primary">
              <ArrowUp size={14} />
            </Button>
          </ScrollToTop>
        </div>
      ) : null}
    </div>
  );
};
export default HorizontalLayout;
