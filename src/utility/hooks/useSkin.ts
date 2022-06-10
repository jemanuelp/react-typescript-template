import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleSkin } from "../../redux/layout";
import { RootState } from "../../redux/reducers/RootReducer";
import { Layout } from "../../domains/interfaces/Layout";
import { SkinTypes } from "../../domains/enums/SkinTypes";

export const useSkin = () => {
  const dispatch = useDispatch();
  const store: Layout = useSelector((state: RootState) => state.layout);

  const setSkin = (type: any) => {
    dispatch(handleSkin(type));
  };

  useEffect(() => {
    // ** Get Body Tag
    const element = window.document.body;

    // ** Define classnames for skins
    const classNames = {
      dark: "dark-layout",
      bordered: "bordered-layout",
      "semi-dark": "semi-dark-layout",
    };

    // ** Remove all classes from Body on mount
    element.classList.remove(...Object.values(classNames));

    // ** If skin is not light add skin class
    if (store.skin !== "light") {
      element.classList.add(
        classNames[
          store.skin === "dark"
            ? "dark"
            : store.skin === SkinTypes["semi-dark"]
            ? SkinTypes["semi-dark"]
            : SkinTypes.bordered
        ]
      );
    }
  }, [store.skin]);

  return { skin: store.skin, setSkin };
};
