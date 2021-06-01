import React, { useEffect } from "react";

import FormField from "./formField";
import FormWrapper from "./formWrapper";

import { useAppSelector } from "../../hooks/useAppSelelctor";
import { setUserValues } from "../../helpers/handlers";
import FieldsNames from "../constants/fieldsNames";
import {
  DeepMap,
  FieldError,
  FieldValues,
  UseFormRegister,
  UseFormSetFocus,
  UseFormSetValue,
} from "react-hook-form/dist/types";

type PropsType = {
  onSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  register: UseFormRegister<FieldValues>;
  setFocus: UseFormSetFocus<FieldValues>;
  validError: DeepMap<FieldValues, FieldError>;
  setValue: UseFormSetValue<FieldValues>;
};
const ProfileForm: React.FC<PropsType> = ({
  onSubmit,
  register,
  validError,
  setValue,
  setFocus,
}) => {
  const { user, isFetch, userSuccess, errors: serverError } = useAppSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (user) {
      setUserValues(setValue, user);
    }
  }, [setValue, user]);

  useEffect(() => {
    setFocus(FieldsNames.USERNAME);
  }, [setFocus]);

  return (
    <FormWrapper
      onSubmit={onSubmit}
      title="Edit Profile"
      btnTitle="Save"
      success={userSuccess}
      isFetch={isFetch}
      form={"user"}
    >
      <FormField
        register={register(FieldsNames.USERNAME)}
        type="text"
        name={FieldsNames.USERNAME}
        label="Username"
        helperText={validError?.username?.message}
        serverErrors={serverError ? serverError.username?.join(". ") : null}
      />
      <FormField
        register={register(FieldsNames.EMAIL)}
        type="email"
        name={FieldsNames.EMAIL}
        label="Email"
        helperText={validError?.email?.message}
        serverErrors={serverError ? serverError.email?.join(". ") : null}
      />
      <FormField
        register={register(FieldsNames.PASSWORD)}
        type="password"
        name={FieldsNames.PASSWORD}
        label="New Password"
        helperText={validError?.password?.message}
      />
      <FormField
        register={register(FieldsNames.IMAGE)}
        type="url"
        name={FieldsNames.IMAGE}
        label=" Avatar image (url)"
        helperText={validError?.image?.message}
      />
    </FormWrapper>
  );
};
export default ProfileForm;
