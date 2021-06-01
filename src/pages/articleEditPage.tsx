import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useActions } from "../hooks/useActions";
import { useAppSelector } from "../hooks/useAppSelelctor";
import useDataStore from "../hooks/useDataStore";

import { RouteURLS } from "../components/constants/route-urls";
import { createArticle } from "../api/article";
import ArticleForm from "../components/forms/formArticle";

const ArticleEditPage: React.FC = () => {
  const article = useAppSelector((state) => state.articles.article)!;
  const { isEdit, success } = useAppSelector((state) => state.articles);
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
    if (success && !isEdit) {
      history.push(`${RouteURLS.ARTICLES}/${article.slug}`);
      setSuccess(false);
      setEdit(false);
    }
  }, [history, success, article, isEdit, setSuccess, setEdit]);

  return (
    <ArticleForm
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      data={data}
      setValue={setValue}
      add={add}
      change={change}
      remove={remove}
      setFocus={setFocus}
    />
  );
};

export default ArticleEditPage;
