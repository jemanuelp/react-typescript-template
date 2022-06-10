import { Fragment, useEffect, memo } from "react";
import classnames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import {
  handleContentWidth,
  handleMenuCollapsed,
  handleMenuHidden,
} from "../../../../redux/layout";
import "animate.css/animate.css";
import { RootState } from "../../../../redux/reducers/RootReducer";
import { RouterTransitionTypes } from "../../../../domains/enums/RouterTransitionTypes";

const LayoutWrapper = (props: any) => {
  // ** Props
  const { children, routeMeta } = props;

  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state);

  const navbarStore = store.navbar;
  const layoutStored = store.layout.type;
  const contentWidth = store.layout.contentWidth;
  const transition = store.layout.routerTransition;
  //** Vars
  const appLayoutCondition =
    (layoutStored === "horizontal" && !routeMeta) ||
    (layoutStored === "horizontal" && routeMeta && !routeMeta.appLayout);
  const Tag = appLayoutCondition ? "div" : Fragment;

  // ** Clean Up Function
  const cleanUp = () => {
    if (routeMeta) {
      if (routeMeta.contentWidth) {
        dispatch(handleContentWidth("full"));
      }
      if (routeMeta.menuCollapsed) {
        dispatch(handleMenuCollapsed(!routeMeta.menuCollapsed));
      }
      if (routeMeta.menuHidden) {
        dispatch(handleMenuHidden(!routeMeta.menuHidden));
      }
    }
  };

  // ** ComponentDidMount
  useEffect(() => {
    if (routeMeta) {
      if (routeMeta.contentWidth) {
        dispatch(handleContentWidth(routeMeta.contentWidth));
      }
      if (routeMeta.menuCollapsed) {
        dispatch(handleMenuCollapsed(routeMeta.menuCollapsed));
      }
      if (routeMeta.menuHidden) {
        dispatch(handleMenuHidden(routeMeta.menuHidden));
      }
    }
    return () => cleanUp();
  }, [routeMeta]);

  return (
    <div
      className={classnames("app-content content overflow-hidden", {
        [routeMeta ? routeMeta.className : ""]:
          routeMeta && routeMeta.className,
        "show-overlay": navbarStore.query.length,
      })}
    >
      <div className="content-overlay"></div>
      <div className="header-navbar-shadow" />
      <div
        className={classnames({
          "content-wrapper": routeMeta && !routeMeta.appLayout,
          "content-area-wrapper": routeMeta && routeMeta.appLayout,
          "container-xxl p-0": contentWidth === "boxed",
          [`animate__animated animate__${transition}`]:
            transition !== RouterTransitionTypes.none && transition.length,
        })}
      >
        <Tag {...(appLayoutCondition ? { className: "content-body" } : {})}>
          {children}
        </Tag>
      </div>
    </div>
  );
};

export default memo(LayoutWrapper);
