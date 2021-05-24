import React, { useEffect } from "react";
import { RouteURLS } from "../../helpers/route-urls";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormField from "./formField";
import FormWrapper from "./formWrapper";
import { Schema } from "../../helpers/validation-ruls";
import { useAppSelector } from "../../hooks/useAppSelelctor";
import { login } from "../../handlers/user";
import { IUserAuthData } from "../../types/user";
import { useHistory } from "react-router";

const SignIn: React.FC = () => {
  const { isFetch, isAuth } = useAppSelector((state) => state.user);
  const serverErrors = useAppSelector((state) => state.user.errors);
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<IUserAuthData>({
    resolver: yupResolver(Schema.signIn),
  });

  const onSubmit = handleSubmit(async (formValues: IUserAuthData) => {
    await login({
      email: formValues.email,
      password: formValues.password,
    });
  });
  useEffect(() => {
    if (isAuth) {
      history.push(RouteURLS.ARTICLES);
    }
  }, [isAuth, history]);
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
      isFetch={isFetch}
      form={"user"}
    >
      <FormField
        register={register("email")}
        type="email"
        name="email"
        label="Email"
        helperText={errors?.email?.message}
      />
      <FormField
        register={register("password")}
        type="password"
        name="password"
        label="Password"
        helperText={errors?.password?.message}
        serverErrors={serverErrors ? "email or password is invalid" : null}
      />
    </FormWrapper>
  );
};
export default SignIn;
