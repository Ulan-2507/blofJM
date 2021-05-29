import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormField from "./formField";
import FormWrapper from "./formWrapper";
import { Schema } from "../../helpers/validation-ruls";
import { IUserUpdateData } from "../../types/user";
import { updateUser } from "../../api/user";
import { useAppSelector } from "../../hooks/useAppSelelctor";
import { setUserValues } from "../../helpers/handlers";
import FieldsNames from "../constants/fieldsNames";

const Profile: React.FC = () => {
  const { user, isFetch, userSuccess } = useAppSelector((state) => state.user);
  const serverErrors = useAppSelector((state) => state.user.errors);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setFocus,
  } = useForm({
    resolver: yupResolver(Schema.profile),
  });

  useEffect(() => {
    if (user) {
      setUserValues(setValue, user);
    }
  }, [setValue, user]);

  useEffect(() => {
    setFocus(FieldsNames.USERNAME);
  }, [setFocus]);

  const onSubmit = handleSubmit(async (formValues: IUserUpdateData) => {
    const data: IUserUpdateData = {
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
    };
    if (formValues.image) data.image = formValues.image;

    await updateUser(data);
  });
  console.log(errors);

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
        helperText={errors?.username?.message}
        serverErrors={serverErrors ? serverErrors.username?.join(". ") : null}
      />
      <FormField
        register={register(FieldsNames.EMAIL)}
        type="email"
        name={FieldsNames.EMAIL}
        label="Email"
        helperText={errors?.email?.message}
        serverErrors={serverErrors ? serverErrors.email?.join(". ") : null}
      />
      <FormField
        register={register(FieldsNames.PASSWORD)}
        type="password"
        name={FieldsNames.PASSWORD}
        label="New Password"
        helperText={errors?.password?.message}
      />
      <FormField
        register={register(FieldsNames.IMAGE)}
        type="url"
        name={FieldsNames.IMAGE}
        label=" Avatar image (url)"
        helperText={errors?.image?.message}
      />
    </FormWrapper>
  );
};
export default Profile;
