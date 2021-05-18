import React from "react";
import { NavLink } from "react-router-dom";
import { logOut } from "../../handlers/user";
import { RouteURLS } from "../../helpers/route-urls";
import { useAppSelector } from "../../hooks/useAppSelelctor";

import defaultPhoto from "../../img/defaultPhoto.jpg";

const ProfileMenu: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);
  
  return (
    <div className="header__profile-menu">
      <NavLink
        className="header__link header__link--create-article"
        to={RouteURLS.SIGN_IN}
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
  );
};

export default ProfileMenu;
