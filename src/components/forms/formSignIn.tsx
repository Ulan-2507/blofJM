import React, { useEffect } from "react";
import { RouteURLS } from "../constants/route-urls";

import {
  DeepMap,
  FieldError,
  UseFormRegister,
  UseFormSetFocus,
} from "react-hook-form";
import FormField from "./formField";
import FormWrapper from "./formWrapper";
import { useAppSelector } from "../../hooks/useAppSelelctor";
import { IUserAuthData } from "../../types/user";
import FieldsNames from "../constants/fieldsNames";

type PropsType = {
  onSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  register: UseFormRegister<IUserAuthData>;
  setFocus: UseFormSetFocus<IUserAuthData>;
  validError: DeepMap<IUserAuthData, FieldError>;
};

const SignInForm: React.FC<PropsType> = ({
  onSubmit,
  register,
  validError,
  setFocus,
}) => {
  const { isFetch, errors: serverErrors } = useAppSelector(
    (state) => state.user
  );

  useEffect(() => {
    setFocus(FieldsNames.EMAIL);
  }, [setFocus]);

  return (
    <FormWrapper
      route={RouteURLS.SIGN_UP}
      linkTitle="Sign Up."
      onSubmit={onSubmit}
      title="Sign In"
      btnTitle="Login"
      linkText="Don’t have an account? "
      isFetch={isFetch}
      form={"user"}
    >
      <FormField
        register={register(FieldsNames.EMAIL)}
        type="email"
        name={FieldsNames.EMAIL}
        label="Email"
        helperText={validError?.email?.message}
      />
      <FormField
        register={register(FieldsNames.PASSWORD)}
        type="password"
        name={FieldsNames.PASSWORD}
        label="Password"
        helperText={validError?.password?.message}
        serverErrors={serverErrors ? "email or password is invalid" : null}
      />
    </FormWrapper>
  );
};
export default SignInForm;
