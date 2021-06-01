import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { registerUser } from "../api/user";
import FieldsNames from "../components/constants/fieldsNames";
import { RouteURLS } from "../components/constants/route-urls";
import SignUpForm from "../components/forms/formSignUp";
import { Schema } from "../helpers/validation-ruls";
import { useActions } from "../hooks/useActions";
import { useAppSelector } from "../hooks/useAppSelelctor";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: string;
}

const SignUpPage = () => {
  const { userSuccess } = useAppSelector((state) => state.user);
  const { setUserSuccess } = useActions();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    watch,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(Schema.signUp),
  });

  const onSubmit = handleSubmit((formValues: FormData) => {
    registerUser({
      username: formValues.username,
      email: formValues.email.toLowerCase(),
      password: formValues.password,
    });
  });

  useEffect(() => {
    if (userSuccess) {
      history.push(`${RouteURLS.ARTICLES}`);
      setUserSuccess(false);
    }
  }, [history, userSuccess, setUserSuccess]);

  let isChecked = !!watch(FieldsNames.ACCEPT_TERMS);
  return (
    <SignUpForm
      register={register}
      validError={errors}
      setFocus={setFocus}
      isChecked={isChecked}
      onSubmit={onSubmit}
    />
  );
};

export default SignUpPage;
