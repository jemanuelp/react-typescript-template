import { ReactElement } from "react";
import { Meta } from "./Meta";

export interface Route {
  path: string;
  element: ReactElement<any, any>;
  index?: boolean;
  meta?: Meta;
  children?: any;
}
