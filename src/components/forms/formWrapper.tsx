import React from "react";
import { NavLink } from "react-router-dom";
import "./form.scss";
import cn from "classnames";
import { ErrorMessages } from "../constants/error-messages";

type TProps = {
  route?: string;
  linkTitle?: string;
  linkText?: string;
  onSubmit: () => void;
  title: string;
  btnTitle: string;
  success?: boolean;
  isFetch?: boolean;
  isSending?: boolean;
  checked?: boolean;
  form: "user" | "article";
  code?: number | null;
  createForm?: boolean;
};
const FormWrapper: React.FC<TProps> = ({
  children,
  route,
  linkTitle,
  linkText,
  onSubmit,
  title,
  btnTitle,
  success,
  isFetch,
  isSending,
  form,
  checked,
  code,
}) => {
  const disabled =
    form === "user" && btnTitle === "create" ? !checked : isSending;
  return (
    <div
      className={cn(
        "form",
        { "form--user-data": form === "user" },
        { "form--article-data": form === "article" }
      )}
    >
      <h2 className="form__title">{title}</h2>
      <form className="form__wrap" onSubmit={onSubmit}>
        {children}
        <button
          disabled={disabled || isFetch}
          className={cn(
            "form__submit",
            { "form__submit--success": success },
            { "form__submit--article": form === "article" }
          )}
          type="submit"
        >
          {success ? "Success!" : btnTitle}
        </button>
      </form>
      {linkText && (
        <p className="form__text">
          {linkText}
          <NavLink to={route ? route : ""}>{linkTitle}</NavLink>
        </p>
      )}
      {!!code && (
        <p className="form__text form__error">{ErrorMessages[`${code}`]}</p>
      )}
    </div>
  );
};

export default FormWrapper;
