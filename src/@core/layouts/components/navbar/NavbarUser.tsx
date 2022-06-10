import UserDropdown from "./UserDropdown";
import Proptypes from "prop-types";

const NavbarUser = () => {
  return (
    <ul className="nav navbar-nav align-items-center ms-auto">
      <UserDropdown />
    </ul>
  );
};
export default NavbarUser;

NavbarUser.propTypes = {
  skin: Proptypes.any,
  setSkin: Proptypes.func,
};
