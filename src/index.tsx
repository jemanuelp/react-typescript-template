import { Suspense, lazy } from "react";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { ThemeContext } from "./utility/context/ThemeColors";
import themeConfig from "./configs/themeConfig";
import { Toaster } from "react-hot-toast";
import Spinner from "./@core/components/spinner/Fallback-spinner";
import "./@core/components/ripple-button";

import "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-jsx.min";

import "react-perfect-scrollbar/dist/css/styles.css";

// ** React Hot Toast Styles
import "../src/@core/scss/react/libs/react-hot-toasts/react-hot-toasts.scss";

import "./@core/assets/fonts/feather/iconfont.css";
import "./@core/scss/core.scss";
import "./assets/scss/style.scss";

import * as serviceWorker from "./serviceWorker";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

// ** Lazy load app
const LazyApp = lazy(() => import("./App"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback={<Spinner />}>
        <ThemeContext>
          <LazyApp />
          <Toaster
            position={themeConfig.layout.toastPosition}
            toastOptions={{ className: "react-hot-toast" }}
          />
        </ThemeContext>
      </Suspense>
    </Provider>
  </BrowserRouter>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
