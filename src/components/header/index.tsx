import React from "react";
import { NavLink } from "react-router-dom";
import { RouteURLS } from "../../helpers/route-urls";
import { useAppSelector } from "../../hooks/useAppSelelctor";

import "./header.scss";
import Menu from "./menu";

const Header: React.FC = () => {
  const { page, pageSize } = useAppSelector((state) => state.articles);

  return (
    <header className="header">
      <NavLink
        className="header__logo"
        to={`${RouteURLS.ARTICLES}?limit=${pageSize}&page=${page}`}
      >
        Realworld Blog
      </NavLink>
      <Menu />
    </header>
  );
};

export default Header;
