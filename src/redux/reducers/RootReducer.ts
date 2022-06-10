import layout from "../layout";
import navbar from "../navbar";
import { combineReducers } from "redux";

const RootReducer = combineReducers({
  layout,
  navbar,
});

export default RootReducer;

export type RootState = ReturnType<typeof RootReducer>;
