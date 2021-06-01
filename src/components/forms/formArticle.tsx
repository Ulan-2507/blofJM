import React, { useEffect } from "react";
import FormField from "./formField";
import FormWrapper from "./formWrapper";
import "./form.scss";
import { TITLE, DESCRIPTION, TEXT } from "../constants/error-messages";
import { v4 as uuidv4 } from "uuid";
import FieldsNames from "../constants/fieldsNames";
import { useAppSelector } from "../../hooks/useAppSelelctor";
import { setArticleValues } from "../../helpers/handlers";
import {
  UseFormSetValue,
  DeepMap,
  FieldError,
  UseFormSetFocus,
  UseFormRegister,
  FieldValues,
} from "react-hook-form/dist/types";

type PropsType = {
  onSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  register: UseFormRegister<FieldValues>;
  setFocus: UseFormSetFocus<FieldValues>;
  errors: DeepMap<FieldValues, FieldError>;
  setValue: UseFormSetValue<FieldValues>;
  data: string[];
  add: () => void;
  change: (value: string, index: number) => void;
  remove: (index: number) => void;
};

const ArticleForm: React.FC<PropsType> = ({
  onSubmit,
  register,
  errors,
  data,
  setValue,
  add,
  change,
  remove,
  setFocus,
}) => {
  const { isSending, error, isEdit } = useAppSelector(
    (state) => state.articles
  );
  const article = useAppSelector((state) => state.articles.article)!;

  useEffect(() => {
    if (isEdit) {
      setArticleValues(setValue, article);
    }
  }, [isEdit, article, setValue]);

  useEffect(() => {
    setFocus(FieldsNames.TITLE);
  }, [setFocus]);

  return (
    <FormWrapper
      onSubmit={onSubmit}
      title="Create new article"
      btnTitle="Send"
      isSending={isSending}
      form={"article"}
    >
      <FormField
        register={register(FieldsNames.TITLE, {
          required: `${TITLE.errorMessage}`,
        })}
        type="text"
        name={FieldsNames.TITLE}
        label="Title"
        helperText={errors?.title?.message}
        serverErrors={error ? error : null}
      />
      <FormField
        register={register(FieldsNames.DESCRIPTION, {
          required: `${DESCRIPTION.errorMessage}`,
        })}
        type="text"
        name={FieldsNames.DESCRIPTION}
        label="Short description"
        helperText={errors?.description?.message}
        serverErrors={error ? error : null}
      />
      <label className="form__label">
        Text
        <textarea
          className="form__input form__input--textarea"
          {...register(FieldsNames.TEXTAREA, {
            required: `${TEXT.errorMessage}`,
          })}
          name={FieldsNames.TEXTAREA}
          placeholder="text"
        ></textarea>
        {!!errors.textarea && (
          <p className="form__error">{errors?.textarea?.message}</p>
        )}
      </label>
      <fieldset className="form__tag-list">
        <legend>Tags</legend>
        <ul>
          {data.map((tag, index) => {
            const name = uuidv4();
            return (
              <li key={name} className="form__tag">
                <input
                  className="form__input form__input--tag"
                  type="text"
                  placeholder="tag"
                  name={name}
                  defaultValue={data[index]}
                  onBlur={(e) => change(e.target.value, index)}
                />
                <button
                  className="form__button form__button--delete"
                  type="button"
                  onClick={() => remove(index)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
        <button
          className="form__button form__button--add"
          type="button"
          onClick={add}
        >
          Add tag
        </button>
      </fieldset>
    </FormWrapper>
  );
};

export default ArticleForm;
