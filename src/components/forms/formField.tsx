import React from "react";
import cn from "classnames";
import { UseFormRegisterReturn } from "react-hook-form/dist/types";
import "./form.scss";

type TProps = {
  type: string;
  label: string;
  name: string;
  register: UseFormRegisterReturn;
  helperText: string | undefined;
  serverErrors?: string | null;
};
const FormField: React.FC<TProps> = ({
  type,
  label,
  name,
  register,
  helperText,
  serverErrors,
}) => {
  return (
    <label
      className={cn("form__label", {
        "form__label--checkbox": type === "checkbox",
      })}
    >
      {type !== "checkbox" ? label : ""}
      <input
        {...register}
        className={type === "checkbox" ? "form__checkbox" : "form__input"}
        type={type}
        name={name}
        placeholder={label}
        autoComplete="on"
      />

      {type === "checkbox" ? label : ""}
      {!!helperText && <p className="form__error">{helperText}</p>}
      {serverErrors && <p className="form__error">{serverErrors}</p>}
    </label>
  );
};

export default FormField;
