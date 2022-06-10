import { Fragment, lazy } from "react";
import { Navigate } from "react-router-dom";
import BlankLayout from "../../../src/@core/layouts/BlankLayout";
import VerticalLayout from "../../../src/@core/layouts/VerticalLayout";
import HorizontalLayout from "../../../src/@core/layouts/HorizontalLayout";
import LayoutWrapper from "../../../src/@core/layouts/components/layout-wrapper";
import PublicRoute from "../../@core/components/routes/PublicRoute";
import { isObjEmpty } from "../../utility/Utils";
import { Route } from "../../domains/interfaces/Route";
import { LayoutTypes } from "../../domains/enums/LayoutTypes";

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

// ** Document title
const TemplateTitle: String = "%s - Vuexy React Admin Template";

// ** Default Route
const DefaultRoute: String = "/home";

const Home = lazy(() => import("../../views/Home"));
const SecondPage = lazy(() => import("../../views/SecondPage"));
const Login = lazy(() => import("../../views/Login"));
const Register = lazy(() => import("../../views/Register"));
const ForgotPassword = lazy(() => import("../../views/ForgotPassword"));
const Error = lazy(() => import("../../views/Error"));

const Routes: Route[] = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={DefaultRoute.toString()} />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/second-page",
    element: <SecondPage />,
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/register",
    element: <Register />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
];

const getRouteMeta = (route: any) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout: any, defaultLayout: any) => {
  const LayoutRoutes: Route[] = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute;

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false);
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && !isBlank
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment;

          route.element = (
            <Wrapper {...(!isBlank ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (layout: LayoutTypes): Route[] => {
  const defaultLayout = layout || "vertical";
  const layouts: LayoutTypes[] = [
    LayoutTypes.horizontal,
    LayoutTypes.vertical,
    LayoutTypes.blank,
  ];

  const AllRoutes: Route[] = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export { DefaultRoute, TemplateTitle, Routes, getRoutes };
