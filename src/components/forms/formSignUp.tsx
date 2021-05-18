import React, { useEffect } from "react";
import { RouteURLS } from "../../helpers/route-urls";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Formfield from "./formField";
import FormWrapper from "./formWrapper";
import { Schema } from "../../helpers/validation-ruls";
import { useAppSelector } from "../../hooks/useAppSelelctor";
import { registerUser } from "../../handlers/user";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: string;
}

const SignUp: React.FC = () => {
  const serverErrors = useAppSelector((state) => state.user.errors);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<FormData>({
    mode: "onBlur",
    resolver: yupResolver(Schema.signUp),
  });

  const onSubmit = handleSubmit((formValues: FormData) => {
    console.log(formValues);
    registerUser({
      username: formValues.username,
      email: formValues.email.toLowerCase(),
      password: formValues.password,
    });
  });

  useEffect(() => {
    setFocus("username");
  }, [setFocus]);

  return (
    <FormWrapper
      route={RouteURLS.SIGN_IN}
      linkTitle="Sign In."
      onSubmit={onSubmit}
      title="Create new account"
      btnTitle="create"
      linkText="Already have an account? "
    >
      <Formfield
        register={register("username")}
        type="text"
        name="username"
        label="Username"
        errors={!!errors.username}
        helperText={errors?.username?.message}
        serverErrors={serverErrors?.username?.join(". ")}
        autocomplete="username"
      />
      <Formfield
        register={register("email")}
        type="email"
        name="email"
        label="Email"
        errors={!!errors.email}
        helperText={errors?.email?.message}
        serverErrors={serverErrors?.email?.join(". ")}
        autocomplete="username"
      />
      <Formfield
        register={register("password")}
        type="password"
        name="password"
        label="Password"
        errors={!!errors.password}
        helperText={errors?.password?.message}
        autocomplete="new-password"
      />
      <Formfield
        register={register("confirmPassword")}
        type="password"
        name="confirmPassword"
        label="Repeat Password"
        errors={!!errors.confirmPassword}
        helperText={errors?.confirmPassword?.message}
        autocomplete="new-password"
      />
      <hr />
      <Formfield
        register={register("acceptTerms")}
        type="checkbox"
        name="acceptTerms"
        label="I agree to the processing of my personal information"
        errors={!!errors.acceptTerms}
        helperText={errors?.acceptTerms?.message}
      />
    </FormWrapper>
  );
};
export default SignUp;
