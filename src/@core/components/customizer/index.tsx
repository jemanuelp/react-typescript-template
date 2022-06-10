import { useState } from "react";
import Select from "react-select";
import classnames from "classnames";
import { selectThemeColors } from "../../../utility/Utils";
import { Settings, X } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Input, Label } from "reactstrap";
import "../../../../src/@core/scss/react/libs/react-select/_react-select.scss";
import { Layout } from "../../../domains/interfaces/Layout";
import { LayoutSetterState } from "../../../domains/interfaces/LayoutSetterState";
import { LayoutTypes } from "../../../domains/enums/LayoutTypes";
import { NavbarLayoutTypes } from "../../../domains/enums/NavbarLayoutTypes";
import { FooterLayoutTypes } from "../../../domains/enums/FooterLayoutTypes";

const Customizer = (props: Layout & LayoutSetterState) => {
  const {
    skin,
    isRTL,
    type,
    navbar,
    menu,
    contentWidth,
    footer,
    routerTransition,
    setSkin,
    setIsRtl,
    setLayout,
    setIsHidden,
    setLastLayout,
    setTransition,
    setNavbarType,
    setFooterType,
    setNavbarColor,
    setContentWidth,
    setMenuCollapsed,
  } = props;

  // ** State
  const [openCustomizer, setOpenCustomizer] = useState(false);

  // ** Toggles Customizer
  const handleToggle = (e: any) => {
    e.preventDefault();
    setOpenCustomizer(!openCustomizer);
  };

  // ** Render Layout Skin Options
  const renderSkinsRadio = () => {
    const skinsArr = [
      {
        name: "light",
        label: "Light",
        checked: skin === "light",
      },
      {
        name: "bordered",
        label: "Bordered",
        checked: skin === "bordered",
      },
      {
        name: "dark",
        label: "Dark",
        checked: skin === "dark",
      },
      {
        name: "semi-dark",
        label: "Semi Dark",
        checked: skin === "semi-dark",
      },
    ];

    return skinsArr.map((radio, index) => {
      const marginCondition = index !== skinsArr.length - 1;

      if (type === LayoutTypes.horizontal && radio.name === "semi-dark") {
        return null;
      }

      return (
        <div
          key={index}
          className={classnames("form-check", { "mb-2 me-1": marginCondition })}
        >
          <Input
            type="radio"
            id={radio.name}
            checked={radio.checked}
            onChange={() => setSkin(radio.name)}
          />
          <Label className="form-check-label" for={radio.name}>
            {radio.label}
          </Label>
        </div>
      );
    });
  };

  // ** Render Navbar Colors Options
  const renderNavbarColors = () => {
    const colorsArr = [
      "white",
      "primary",
      "secondary",
      "success",
      "danger",
      "info",
      "warning",
      "dark",
    ];

    return colorsArr.map((color) => (
      <li
        key={color}
        className={classnames(`color-box bg-${color}`, {
          selected: navbar.backgroundColor === color,
          border: color === "white",
        })}
        onClick={() => setNavbarColor(color)}
      ></li>
    ));
  };

  // ** Render Navbar Type Options
  const renderNavbarTypeRadio = () => {
    const navbarTypeArr = [
      {
        name: "floating",
        label: "Floating",
        checked: navbar.type === NavbarLayoutTypes.floating,
      },
      {
        name: "sticky",
        label: "Sticky",
        checked: navbar.type === NavbarLayoutTypes.sticky,
      },
      {
        name: "static",
        label: "Static",
        checked: navbar.type === NavbarLayoutTypes.static,
      },
      {
        name: "hidden",
        label: "Hidden",
        checked: navbar.type === NavbarLayoutTypes.hidden,
      },
    ];

    return navbarTypeArr.map((radio, index) => {
      const marginCondition = index !== navbarTypeArr.length - 1;

      if (type === LayoutTypes.horizontal && radio.name === "hidden") {
        return null;
      }

      return (
        <div
          key={index}
          className={classnames("form-check", { "mb-2 me-1": marginCondition })}
        >
          <Input
            type="radio"
            id={radio.name}
            checked={radio.checked}
            onChange={() => setNavbarType(radio.name)}
          />
          <Label className="form-check-label" for={radio.name}>
            {radio.label}
          </Label>
        </div>
      );
    });
  };

  // ** Render Footer Type Options
  const renderFooterTypeRadio = () => {
    const footerTypeArr = [
      {
        name: "sticky",
        label: "Sticky",
        checked: footer.type === FooterLayoutTypes.sticky,
      },
      {
        name: "static",
        label: "Static",
        checked: footer.type === FooterLayoutTypes.static,
      },
      {
        name: "hidden",
        label: "Hidden",
        checked: footer.type === FooterLayoutTypes.hidden,
      },
    ];

    return footerTypeArr.map((radio, index) => {
      const marginCondition = index !== footerTypeArr.length - 1;

      return (
        <div
          key={index}
          className={classnames("form-check", { "mb-2 me-1": marginCondition })}
        >
          <Input
            type="radio"
            checked={radio.checked}
            id={`footer-${radio.name}`}
            onChange={() => setFooterType(radio.name)}
          />
          <Label className="form-check-label" for={`footer-${radio.name}`}>
            {radio.label}
          </Label>
        </div>
      );
    });
  };

  // **  Router Transition Options
  const transitionOptions = [
    { value: "fadeIn", label: "Fade" },
    { value: "fadeInLeft", label: "Fade In Left" },
    { value: "zoomIn", label: "Zoom In" },
    { value: "none", label: "None" },
  ];

  // ** Get Current Transition
  const transitionValue = transitionOptions.find(
    (i) => i.value === routerTransition
  );

  return (
    <div
      className={classnames("customizer d-none d-md-block", {
        open: openCustomizer,
      })}
    >
      <a
        href="/"
        className="customizer-toggle d-flex align-items-center justify-content-center"
        onClick={handleToggle}
      >
        <Settings size={14} className="spinner" />
      </a>
      <PerfectScrollbar
        className="customizer-content"
        options={{ wheelPropagation: false }}
      >
        <div className="customizer-header px-2 pt-1 pb-0 position-relative">
          <h4 className="mb-0">Theme Customizer</h4>
          <p className="m-0">Customize & Preview in Real Time</p>
          <a href="/" className="customizer-close" onClick={handleToggle}>
            <X />
          </a>
        </div>

        <hr />

        <div className="px-2">
          <div className="mb-2">
            <p className="fw-bold">Skin</p>
            <div className="d-flex">{renderSkinsRadio()}</div>
          </div>

          <div className="mb-2">
            <p className="fw-bold">Content Width</p>
            <div className="d-flex">
              <div className="form-check me-1">
                <Input
                  type="radio"
                  id="full-width"
                  checked={contentWidth === "full"}
                  onChange={() => setContentWidth("full")}
                />
                <Label className="form-check-label" for="full-width">
                  Full Width
                </Label>
              </div>
              <div className="form-check">
                <Input
                  id="boxed"
                  type="radio"
                  checked={contentWidth === "boxed"}
                  onChange={() => setContentWidth("boxed")}
                />
                <Label className="form-check-label" for="boxed">
                  Boxed
                </Label>
              </div>
            </div>
          </div>

          <div className="form-switch mb-2 ps-0">
            <div className="d-flex">
              <p className="fw-bold me-auto mb-0">RTL</p>
              <Input
                type="switch"
                id="rtl"
                name="RTL"
                checked={isRTL}
                onChange={() => setIsRtl(!isRTL)}
              />
            </div>
          </div>

          <div className="mb-2">
            <div className="d-flex justify-content-between align-items-center">
              <p className="fw-bold mb-0">Router Transition</p>
              <Select
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                defaultValue={transitionOptions[0]}
                value={transitionValue}
                options={transitionOptions}
                isClearable={false}
                onChange={({ value }: any) => setTransition(value)}
              />
            </div>
          </div>
        </div>

        <hr />

        <div className="px-2">
          <p className="fw-bold">Menu Layout</p>
          <div className="mb-2">
            <div className="d-flex align-items-center">
              <div className="form-check me-1">
                <Input
                  type="radio"
                  id="vertical-layout"
                  checked={type === LayoutTypes.vertical}
                  onChange={() => {
                    setLayout("vertical");
                    setLastLayout("vertical");
                  }}
                />
                <Label className="form-check-label" for="vertical-layout">
                  Vertical
                </Label>
              </div>
              <div className="form-check">
                <Input
                  type="radio"
                  id="horizontal-layout"
                  checked={type === LayoutTypes.horizontal}
                  onChange={() => {
                    setLayout("horizontal");
                    setLastLayout("horizontal");
                  }}
                />
                <Label className="form-check-label" for="horizontal-layout">
                  Horizontal
                </Label>
              </div>
            </div>
          </div>
          {type !== LayoutTypes.horizontal ? (
            <div className="form-switch mb-2 ps-0">
              <div className="d-flex align-items-center">
                <p className="fw-bold me-auto mb-0">Menu Collapsed</p>
                <Input
                  type="switch"
                  id="menu-collapsed"
                  name="menu-collapsed"
                  checked={menu.isCollapsed}
                  onChange={() =>
                    setMenuCollapsed && setMenuCollapsed(!menu.isCollapsed)
                  }
                />
              </div>
            </div>
          ) : null}

          <div className="form-switch mb-2 ps-0">
            <div className="d-flex align-items-center">
              <p className="fw-bold me-auto mb-0">Menu Hidden</p>
              <Input
                type="switch"
                id="menu-hidden"
                name="menu-hidden"
                checked={menu.isHidden}
                onChange={() => setIsHidden(!menu.isHidden)}
              />
            </div>
          </div>
        </div>

        <hr />

        <div className="px-2">
          {type !== LayoutTypes.horizontal ? (
            <div className="mb-2">
              <p className="fw-bold">Navbar Color</p>
              <ul className="list-inline unstyled-list">
                {renderNavbarColors()}
              </ul>
            </div>
          ) : null}

          <div className="mb-2">
            <p className="fw-bold">
              {type === LayoutTypes.horizontal ? "Menu" : "Navbar"} Type
            </p>
            <div className="d-flex">{renderNavbarTypeRadio()}</div>
          </div>
        </div>

        <hr />

        <div className="px-2">
          <div className="mb-2">
            <p className="fw-bold">Footer Type</p>
            <div className="d-flex">{renderFooterTypeRadio()}</div>
          </div>
        </div>
      </PerfectScrollbar>
    </div>
  );
};

export default Customizer;
