import React, { useEffect } from "react";
import { RouteURLS } from "../../helpers/route-urls";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormField from "./formField";
import FormWrapper from "./formWrapper";
import { Schema } from "../../helpers/validation-ruls";
import { useAppSelector } from "../../hooks/useAppSelelctor";
import { registerUser } from "../../api/user";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: string;
}

const SignUp: React.FC = () => {
  const serverErrors = useAppSelector((state) => state.user.errors);
  const { isFetch } = useAppSelector((state) => state.user);
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
      isFetch={isFetch}
      form={"user"}
    >
      <FormField
        register={register("username")}
        type="text"
        name="username"
        label="Username"
        helperText={errors?.username?.message}
        serverErrors={serverErrors?.username?.join(". ")}
      />
      <FormField
        register={register("email")}
        type="email"
        name="email"
        label="Email"
        helperText={errors?.email?.message}
        serverErrors={serverErrors?.email?.join(". ")}
      />
      <FormField
        register={register("password")}
        type="password"
        name="password"
        label="Password"
        helperText={errors?.password?.message}
      />
      <FormField
        register={register("confirmPassword")}
        type="password"
        name="confirmPassword"
        label="Repeat Password"
        helperText={errors?.confirmPassword?.message}
      />
      <hr />
      <FormField
        register={register("acceptTerms")}
        type="checkbox"
        name="acceptTerms"
        label="I agree to the processing of my personal information"
        helperText={errors?.acceptTerms?.message}
      />
    </FormWrapper>
  );
};
export default SignUp;
