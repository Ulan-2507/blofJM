import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Field from "./formField";
import FormWrapper from "./formWrapper";
import { Schema } from "../../helpers/validation-ruls";
import { IUserUpdateData } from "../../types/user";
import { updateUser } from "../../handlers/user";
import { useAppSelector } from "../../hooks/useAppSelelctor";
import { RouteURLS } from "../../helpers/route-urls";
import { useHistory } from "react-router-dom";

const Profile: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const error = useAppSelector((state) => state.user.errors);
  let history = useHistory();
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
    if (error) {
      history.push(`${RouteURLS.ARTICLES}`);
    }
  });

  return (
    <FormWrapper onSubmit={onSubmit} title="Edit Profile" btnTitle="Save">
      <Field
        register={register("username")}
        type="text"
        name="username"
        label="Username"
        errors={!!errors.username}
        helperText={errors?.username?.message}
        autocomplete="username"
      />
      <Field
        register={register("email")}
        type="email"
        name="email"
        label="Email"
        errors={!!errors.email}
        helperText={errors?.email?.message}
        autocomplete="username"
      />
      <Field
        register={register("password")}
        type="password"
        name="password"
        label="New Password"
        errors={!!errors.password}
        helperText={errors?.password?.message}
        autocomplete="new-password"
      />
      <Field
        register={register("image")}
        type="url"
        name="image"
        label=" Avatar image (url)"
        errors={!!errors.image}
        helperText={errors?.image?.message}
      />
    </FormWrapper>
  );
};
export default Profile;
