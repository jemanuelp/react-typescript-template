import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/RootReducer";
import { handleNavbarType } from "../../redux/layout";
import { NavbarLayoutTypes } from "../../domains/enums/NavbarLayoutTypes";

export interface useNavbarTypeInterface {
  navbarType: NavbarLayoutTypes;
  setNavbarType: (navbarType: NavbarLayoutTypes) => void;
}

export const useNavbarType = (): useNavbarTypeInterface => {
  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.layout);

  const setNavbarType = (type: any) => {
    dispatch(handleNavbarType(type));
  };

  return { navbarType: store.navbar.type, setNavbarType };
};
