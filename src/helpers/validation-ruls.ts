import {
  ACCEPT_TERM,
  CONFIRM_PASSWORD,
  EMAIL,
  IMAGE,
  PASSWORD,
  USERNAME,
} from "./error-messages";
import * as yup from "yup";

export const Schema = {
  signUp: yup.object().shape({
    username: yup
      .string()
      .min(3, USERNAME.min(3))
      .max(20, USERNAME.max(20))
      .required(USERNAME.require),
    email: yup.string().email(EMAIL.errorMessage).required(EMAIL.require),
    password: yup
      .string()
      .min(6, PASSWORD.min(6))
      .max(40, PASSWORD.max(40))
      .required(PASSWORD.required),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], CONFIRM_PASSWORD.errorMessage)
      .required(CONFIRM_PASSWORD.required),
    acceptTerms: yup.bool().oneOf([true], ACCEPT_TERM.errorMessage),
  }),

  signIn: yup.object().shape({
    email: yup.string().email(EMAIL.errorMessage).required(EMAIL.require),
    password: yup
      .string()
      .min(6, PASSWORD.min(6))
      .max(40, PASSWORD.max(40))
      .required(PASSWORD.required),
  }),
  profile: yup.object().shape({
    username: yup
      .string()
      .min(3, USERNAME.min(3))
      .max(20, USERNAME.max(20))
      .required(USERNAME.require),
    email: yup.string().email(EMAIL.errorMessage).required(EMAIL.require),
    password: yup
      .string()
      .min(6, PASSWORD.min(6))
      .max(40, PASSWORD.max(40))
      .required(PASSWORD.required),
    image: yup.string().url(IMAGE.errorMessage),
  }),
};
