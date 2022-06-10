import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleRTL } from "../../redux/layout";
import { RootState } from "../../redux/reducers/RootReducer";

export interface useRTLInterface {
  isRtl: boolean;
  setIsRtl: (isRtl: boolean) => void;
}

export const useRTL = (): useRTLInterface => {
  // ** Store Vars
  const dispatch = useDispatch();
  const isRtl: boolean = useSelector((state: RootState) => state.layout.isRTL);

  // ** Return a wrapped version of useState's setter function
  const setIsRtl = (value: boolean) => {
    dispatch(handleRTL(value));
  };

  useEffect(() => {
    // ** Get HTML Tag
    const element = document.getElementsByTagName("html")[0];

    // ** If isRTL then add attr dir='rtl' with HTML else attr dir='ltr'
    if (isRtl) {
      element.setAttribute("dir", "rtl");
    } else {
      element.setAttribute("dir", "ltr");
    }
  }, [isRtl]);

  return { isRtl, setIsRtl };
};
