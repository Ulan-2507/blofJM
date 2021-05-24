import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormField from "./formField";
import FormWrapper from "./formWrapper";
import { Schema } from "../../helpers/validation-ruls";
import { IUserUpdateData } from "../../types/user";
import { updateUser } from "../../handlers/user";
import { useAppSelector } from "../../hooks/useAppSelelctor";

const Profile: React.FC = () => {
  const { user, isFetch, success } = useAppSelector((state) => state.user);
  const serverErrors = useAppSelector((state) => state.user.errors);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setFocus,
  } = useForm<IUserUpdateData>({
    resolver: yupResolver(Schema.profile),
  });

  useEffect(() => {
    if (user) {
      setValue("username", user.username);
      setValue("email", user.email);
      setValue("image", user.image || "");
    }
  }, [setValue, user]);

  useEffect(() => {
    setFocus("username");
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
      success={success}
      isFetch={isFetch}
      form={"user"}
    >
      <FormField
        register={register("username")}
        type="text"
        name="username"
        label="Username"
        helperText={errors?.username?.message}
        serverErrors={serverErrors ? serverErrors.username?.join(". ") : null}
      />
      <FormField
        register={register("email")}
        type="email"
        name="email"
        label="Email"
        helperText={errors?.email?.message}
        serverErrors={serverErrors ? serverErrors.email?.join(". ") : null}
      />
      <FormField
        register={register("password")}
        type="password"
        name="password"
        label="New Password"
        helperText={errors?.password?.message}
      />
      <FormField
        register={register("image")}
        type="url"
        name="image"
        label=" Avatar image (url)"
        helperText={errors?.image?.message}
      />
    </FormWrapper>
  );
};
export default Profile;
