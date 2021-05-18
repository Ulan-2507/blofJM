import React from "react";
import { NavLink } from "react-router-dom";
import "./form.scss";

type TProps = {
  route?: string;
  linkTitle?: string;
  linkText?: string;
  onSubmit: () => void;
  title: string;
  btnTitle: string;
};
const FormWrapper: React.FC<TProps> = ({
  children,
  route,
  linkTitle,
  linkText,
  onSubmit,
  title,
  btnTitle,
}) => {
  return (
    <div className="form">
      <h2 className="form__title">{title}</h2>
      <form className="form__wrap" onSubmit={onSubmit}>
        {children}
        <button className="form__submit" type="submit">
          {btnTitle}
        </button>
      </form>
      {linkText && (
        <p className="form__text">
          {linkText}
          <NavLink to={route ? route : ""}>{linkTitle}</NavLink>
        </p>
      )}
    </div>
  );
};

export default FormWrapper;
