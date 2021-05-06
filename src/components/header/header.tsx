import React from "react";
import "./header.scss";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__logo">Realworld Blog</div>
      <div>
        <button className="header__sign-btn" type="button">
          Sign In
        </button>
        <button className="header__sign-btn" type="button">
          Sign Up
        </button>
      </div>
    </header>
  );
};

export default Header;
