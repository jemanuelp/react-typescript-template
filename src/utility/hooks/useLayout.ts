// import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { handleLayout, handleLastLayout } from "../../redux/layout";
import { RootState } from "../../redux/reducers/RootReducer";
import { Layout } from "../../domains/interfaces/Layout";
import { LayoutTypes } from "../../domains/enums/LayoutTypes";

export interface useLayoutInterface {
  layout: LayoutTypes;
  lastLayout: LayoutTypes;
  setLayout: Function;
  setLastLayout: Function;
}

export const useLayout = () => {
  const dispatch = useDispatch();
  const store: Layout = useSelector((state: RootState) => state.layout);

  const setLayout = (value: LayoutTypes) => {
    dispatch(handleLayout(value));
  };

  const setLastLayout = (value: LayoutTypes) => {
    dispatch(handleLastLayout(value));
  };

  // const handleLayoutUpdate = useCallback(() => {
  //   // ** If layout is horizontal & screen size is equals to or below 1200
  //   if (store.layout === 'horizontal' && window.innerWidth <= 1200) {
  //     setLayout('vertical')
  //     setLastLayout('horizontal')
  //   }
  //   // ** If lastLayout is horizontal & screen size is equals to or above 1200
  //   if (store.lastLayout === 'horizontal' && window.innerWidth >= 1200) {
  //     setLayout('horizontal')
  //   }
  // }, [])

  // // ** ComponentDidMount
  // useEffect(() => {
  //   handleLayoutUpdate()
  // }, [])

  // useEffect(() => {
  //   // ** Window Resize Event
  //   window.addEventListener('resize', handleLayoutUpdate)
  // }, [store.layout, store.lastLayout])

  if (window) {
    const breakpoint = 1200;

    if (window.innerWidth < breakpoint) {
      setLayout(LayoutTypes.vertical);
    }

    window.addEventListener("resize", () => {
      if (
        window.innerWidth <= breakpoint &&
        store.lastLayout !== "vertical" &&
        store.type !== "vertical"
      ) {
        setLayout(LayoutTypes.vertical);
      }
      if (
        window.innerWidth >= breakpoint &&
        store.lastLayout &&
        store.lastLayout !== store.type
      ) {
        setLayout(store.lastLayout);
      }
    });
  }

  return {
    layout: store.type,
    setLayout,
    lastLayout: store.lastLayout,
    setLastLayout,
  };
};
