import React from "react";
import { NavLink } from "react-router-dom";
import { RouteURLS } from "../../helpers/route-urls";
import cn from "classnames";
type PropsType = {
  showMenu: boolean;
  showHandler: () => void;
};
const AuthLinks: React.FC<PropsType> = ({ showMenu, showHandler }) => {
  return (
    <div
      onClick={showHandler}
      className={cn("header__auth-links", { "open-menu": showMenu })}
    >
      <NavLink
        className="header__link"
        to={RouteURLS.SIGN_IN}
        activeClassName="selected"
      >
        Sign In
      </NavLink>
      <NavLink
        className="header__link"
        to={RouteURLS.SIGN_UP}
        activeClassName="selected"
      >
        Sign Up
      </NavLink>
    </div>
  );
};

export default AuthLinks;
