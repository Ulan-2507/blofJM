import React, { useEffect } from "react";
import { RouteURLS } from "../../helpers/route-urls";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Field from "./formField";
import FormWrapper from "./formWrapper";
import { Schema } from "../../helpers/validation-ruls";
import { useAppSelector } from "../../hooks/useAppSelelctor";
import { login } from "../../handlers/user";
import { IUserAuthData } from "../../types/user";

const SignIn: React.FC = () => {
  const serverErrors = useAppSelector((state) => state.user.errors);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<IUserAuthData>({
    resolver: yupResolver(Schema.signIn),
  });

  const onSubmit = handleSubmit((formValues: IUserAuthData) => {
    login({
      email: formValues.email,
      password: formValues.password,
    });
  });

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  return (
    <FormWrapper
      route={RouteURLS.SIGN_UP}
      linkTitle="Sign Up."
      onSubmit={onSubmit}
      title="Sign In"
      btnTitle="Login"
      linkText="Don’t have an account? "
    >
      <Field
        register={register("email")}
        type="email"
        name="email"
        label="Email"
        errors={!!errors.email}
        helperText={errors?.email?.message}
        autocomplete="username"
      />
      <Field
        register={register("password")}
        type="password"
        name="password"
        label="Password"
        errors={!!errors.password}
        helperText={errors?.password?.message}
        serverErrors={serverErrors ? "email or password is invalid" : null}
        autocomplete="current-password"
      />
    </FormWrapper>
  );
};
export default SignIn;
