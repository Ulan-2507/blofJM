import React from "react";
import { NavLink } from "react-router-dom";
import { RouteURLS } from "../../helpers/route-urls";
import { useAppSelector } from "../../hooks/useAppSelelctor";
import FormLinks from "./from-links";
import "./header.scss";
import ProfileMenu from "./profile-menu";

const Header: React.FC = () => {
  const pageSize = useAppSelector((state) => state.articles.pageSize);
  const page = useAppSelector((state) => state.articles.page);
  const isAuth = useAppSelector((state) => state.user.isAuth);

  return (
    <header className="header">
      <NavLink
        className="header__logo"
        to={`${RouteURLS.ARTICLES}?limit=${pageSize}&page=${page}`}
      >
        Realworld Blog
      </NavLink>

      {isAuth ? <ProfileMenu /> : <FormLinks />}
    </header>
  );
};

export default Header;
