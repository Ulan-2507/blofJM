import { IArticle } from "../types/article";
import { IUser } from "../types/user";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import FieldsNames from "../components/constants/fieldsNames";

export const setUserValues = (
  setValue: UseFormSetValue<FieldValues>,
  user: IUser
): void => {
  setValue(FieldsNames.USERNAME, user.username);
  setValue(FieldsNames.EMAIL, user.email);
  setValue(FieldsNames.IMAGE, user.image || "");
};

export const setArticleValues = (
  setValue: UseFormSetValue<FieldValues>,
  article: IArticle
): void => {
  setValue(FieldsNames.TITLE, article.title, { shouldValidate: true });
  setValue(FieldsNames.DESCRIPTION, article.description, {
    shouldValidate: true,
  });
  setValue(FieldsNames.TEXTAREA, article.body, { shouldValidate: true });
};
