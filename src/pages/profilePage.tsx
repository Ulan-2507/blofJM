import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { updateUser } from "../api/user";
import ProfileForm from "../components/forms/formProfile";
import { Schema } from "../helpers/validation-ruls";
import { IUserUpdateData } from "../types/user";

const ProfilePage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setFocus,
  } = useForm({
    resolver: yupResolver(Schema.profile),
  });

  const onSubmit = handleSubmit((formValues: IUserUpdateData) => {
    const data: IUserUpdateData = {
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
    };
    if (formValues.image) data.image = formValues.image;

    updateUser(data);
  });
  return (
    <ProfileForm
      onSubmit={onSubmit}
      register={register}
      validError={errors}
      setValue={setValue}
      setFocus={setFocus}
    />
  );
};
export default ProfilePage;
