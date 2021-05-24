import React from "react";
import { NavLink } from "react-router-dom";
import { RouteURLS } from "../../helpers/route-urls";
import { useAppSelector } from "../../hooks/useAppSelelctor";

import "./header.scss";
import Menu from "./menu";

const Header: React.FC = () => {
  const pageSize = useAppSelector((state) => state.articles.pageSize);
  const page = useAppSelector((state) => state.articles.page);

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
