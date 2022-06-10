import { handleNavbarColor } from "../../redux/layout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/RootReducer";
import { Layout } from "../../domains/interfaces/Layout";

export const useNavbarColor = () => {
  const dispatch = useDispatch();
  const store: Layout = useSelector((state: RootState) => state.layout);

  // ** Return a wrapped version of useState's setter function
  const setNavbarColor = (value: any) => {
    dispatch(handleNavbarColor(value));
  };

  return { navbarColor: store.navbar.backgroundColor, setNavbarColor };
};
