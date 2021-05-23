import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createArticle } from "../../handlers/article";
import { useAppSelector } from "../../hooks/useAppSelelctor";
import FormField from "./formField";
import FormWrapper from "./formWrapper";
import "./form.scss";
import { TITLE, DESCRIPTION, TEXT } from "../../helpers/error-messages";
import { useHistory } from "react-router";
import { RouteURLS } from "../../helpers/route-urls";
import { v4 as uuidv4 } from "uuid";
import useDataStore from "../../hooks/useDataStore";
import { useActions } from "../../hooks/useActions";

const ArticleForm: React.FC = () => {
  const article = useAppSelector((state) => state.articles.article)!;
  const { isSending, error, success, isEdit } = useAppSelector(
    (state) => state.articles
  );
  const initialValue = isEdit ? article.tagList : [];
  const [data, add, change, remove] = useDataStore(initialValue);
  const history = useHistory();
  const { setSuccess, setEdit } = useActions();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    setValue,
  } = useForm({
    mode: "onBlur",
  });
  const onSubmit = handleSubmit((formValues) => {
    createArticle({
      article: {
        title: formValues.title,
        description: formValues.description,
        body: formValues.textarea,
        tagList: data,
      },
    });
  });
  useEffect(() => {
    if (isEdit) {
      setValue("title", article.title, { shouldValidate: true });
      setValue("description", article.description, { shouldValidate: true });
      setValue("textarea", article.body, { shouldValidate: true });
    }
  }, [isEdit, article, setValue]);

  useEffect(() => {
    setFocus("title");
  }, [setFocus]);

  useEffect(() => {
    if (success && !isEdit) {
      history.push(`${RouteURLS.ARTICLES}/${article.slug}`);
      setSuccess(false);
      setEdit(false);
    }
  }, [history, success, article, isEdit, setSuccess, setEdit]);

  return (
    <FormWrapper
      onSubmit={onSubmit}
      title="Create new article"
      btnTitle="Send"
      isSending={isSending}
      form={"article"}
    >
      <FormField
        register={register("title", {
          required: `${TITLE.errorMessage}`,
        })}
        type="text"
        name="title"
        label="Title"
        helperText={errors?.title?.message}
        serverErrors={error ? error : null}
      />
      <FormField
        register={register("description", {
          required: `${DESCRIPTION.errorMessage}`,
        })}
        type="text"
        name="description"
        label="Short description"
        helperText={errors?.description?.message}
        serverErrors={error ? error : null}
      />
      <label className="form__label">
        Text
        <textarea
          className="form__input form__input--textarea"
          {...register("textarea", {
            required: `${TEXT.errorMessage}`,
          })}
          name="textarea"
          placeholder="text"
        ></textarea>
        {!!errors.textarea && (
          <p className="form__error">{errors?.textarea?.message}</p>
        )}
      </label>
      <fieldset className="form__tags">
        <legend>Tags</legend>
        <ul className="form__tag-list">
          {data.map((tag, index) => {
            const name = uuidv4();
            return (
              <li key={name} className="form__tag-row">
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
