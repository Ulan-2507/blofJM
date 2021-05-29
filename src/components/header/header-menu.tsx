import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { logOut } from "../../api/user";
import { RouteURLS } from "../constants/route-urls";
import { useAppSelector } from "../../hooks/useAppSelelctor";
import cn from "classnames";

import defaultPhoto from "../../img/defaultPhoto.jpg";
import AuthLinks from "./auth-links";

const Menu: React.FC = () => {
  const { user, isAuth } = useAppSelector((state) => state.user);
  const [showMenu, setShowMenu] = useState(false);
  const showHandler = () => {
    setShowMenu((showMenu) => !showMenu);
  };
  useEffect(() => {
    if (window.innerWidth > 560 && showMenu) {
      showHandler();
    }
  }, [showMenu]);

  return (
    <React.Fragment>
      <button
        onClick={showHandler}
        className={cn("header__menu", { change: showMenu })}
      >
        <span className="bar1"></span>
        <span className="bar2"></span>
        <span className="bar3"></span>
      </button>
      {isAuth ? (
        <div
          onClick={showHandler}
          className={cn("header__profile-menu", { "open-menu": showMenu })}
        >
          <NavLink
            className="header__link header__link--create-article"
            to={RouteURLS.NEW_ARTICLE}
            activeClassName="selected"
          >
            Create Article
          </NavLink>
          <NavLink className="header__edit-link" to={RouteURLS.PROFILE}>
            <div className="header__author-name">{user?.username}</div>
            <div className="header__author-avatar">
              <img src={user?.image || defaultPhoto} alt="avatar" />
            </div>
          </NavLink>

          <NavLink
            className="header__link header__link--log-out"
            to={RouteURLS.ARTICLES}
            onClick={() => logOut()}
          >
            Log Out
          </NavLink>
        </div>
      ) : (
        <AuthLinks showMenu={showMenu} showHandler={showHandler} />
      )}
    </React.Fragment>
  );
};

export default Menu;
