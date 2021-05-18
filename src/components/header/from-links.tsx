import React from "react";
import { NavLink } from "react-router-dom";
import { RouteURLS } from "../../helpers/route-urls";

const FormLinks: React.FC = () => {
  return (
    <div>
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

export default FormLinks;
