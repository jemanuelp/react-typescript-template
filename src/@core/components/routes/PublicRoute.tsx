import { Suspense } from "react";
import { Navigate } from "react-router-dom";
import {
  getUserData,
  getHomeRouteForLoggedInUser,
} from "../../../utility/Utils";

const PublicRoute = ({ children, route }: any) => {
  if (route) {
    const user = getUserData();

    const restrictedRoute = route.meta && route.meta.restricted;

    if (user && restrictedRoute) {
      return (
        <Navigate to={getHomeRouteForLoggedInUser(user.role).toString()} />
      );
    }
  }

  return <Suspense fallback={null}>{children}</Suspense>;
};

export default PublicRoute;
