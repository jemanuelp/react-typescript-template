import React, { useState, useEffect, Suspense } from "react";

// ** Router Import
import Router from "./router/Router";

// ** Routes & Default Routes
import { getRoutes } from "./router/routes";

// ** Hooks Imports
import { useLayout } from "./utility/hooks/useLayout";
import { Route } from "./domains/interfaces/Route";

const App = () => {
  const [allRoutes, setAllRoutes] = useState<Route[]>([]);

  // ** Hooks
  const { layout } = useLayout();

  useEffect(() => {
    setAllRoutes(getRoutes(layout));
  }, [layout]);

  return (
    <Suspense fallback={null}>
      <Router allRoutes={allRoutes} />
    </Suspense>
  );
};

export default App;
