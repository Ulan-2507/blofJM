import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { login } from "../api/user";
import { RouteURLS } from "../components/constants/route-urls";
import SignInForm from "../components/forms/formSignIn";
import { Schema } from "../helpers/validation-ruls";
import { useAppSelector } from "../hooks/useAppSelelctor";
import { IUserAuthData } from "../types/user";

const SignInPage = () => {
  const { isAuth } = useAppSelector((state) => state.user);
  const history = useHistory();
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
    if (isAuth) {
      history.push(RouteURLS.ARTICLES);
    }
  }, [isAuth, history]);
  return (
    <SignInForm
      register={register}
      validError={errors}
      setFocus={setFocus}
      onSubmit={onSubmit}
    />
  );
};

export default SignInPage;
