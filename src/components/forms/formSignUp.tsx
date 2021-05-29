import React, { useEffect } from "react";
import { RouteURLS } from "../constants/route-urls";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormField from "./formField";
import FormWrapper from "./formWrapper";
import { Schema } from "../../helpers/validation-ruls";
import { useAppSelector } from "../../hooks/useAppSelelctor";
import { registerUser } from "../../api/user";
import { useHistory } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import FieldsNames from "../constants/fieldsNames";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: string;
}

const SignUp: React.FC = () => {
  const serverErrors = useAppSelector((state) => state.user.errors);
  const { errorCode, isFetch, userSuccess } = useAppSelector(
    (state) => state.user
  );
  const { setUserSuccess } = useActions();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    watch,
  } = useForm<FormData>({
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

  let checked = watch(FieldsNames.ACCEPT_TERMS);

  useEffect(() => {
    setFocus(FieldsNames.USERNAME);
  }, [setFocus]);

  useEffect(() => {
    if (userSuccess) {
      history.push(`${RouteURLS.ARTICLES}`);
      setUserSuccess(false);
    }
  }, [history, userSuccess, setUserSuccess]);
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
      checked={!!checked}
      code={errorCode}
    >
      <FormField
        register={register(FieldsNames.USERNAME)}
        type="text"
        name={FieldsNames.USERNAME}
        label="Username"
        helperText={errors?.username?.message}
        serverErrors={serverErrors?.username?.join(". ")}
      />
      <FormField
        register={register(FieldsNames.EMAIL)}
        type="email"
        name={FieldsNames.EMAIL}
        label="Email"
        helperText={errors?.email?.message}
        serverErrors={serverErrors?.email?.join(". ")}
      />
      <FormField
        register={register(FieldsNames.PASSWORD)}
        type="password"
        name={FieldsNames.PASSWORD}
        label="Password"
        helperText={errors?.password?.message}
      />
      <FormField
        register={register(FieldsNames.CONFIRM_PASSWORD)}
        type="password"
        name={FieldsNames.CONFIRM_PASSWORD}
        label="Repeat Password"
        helperText={errors?.confirmPassword?.message}
      />
      <hr />
      <FormField
        register={register(FieldsNames.ACCEPT_TERMS)}
        type="checkbox"
        name={FieldsNames.ACCEPT_TERMS}
        label="I agree to the processing of my personal information"
        helperText={errors?.acceptTerms?.message}
      />
    </FormWrapper>
  );
};
export default SignUp;
