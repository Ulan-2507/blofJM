import { axiosApiInstance, getData, postFetch } from "../api";
import {
  setLoadStatus,
  setArticles,
  setError,
  setArticle,
  setSending,
  setSuccess,
  setEdit,
} from "../slices/articles";
import { setErrorCode } from "../slices/user";
import { store } from "../store";
import { ICreateArticle } from "../types/article";

export const getArticles = async (
  pageSize: number,
  page: number
): Promise<void> => {
  store.dispatch(setLoadStatus());
  try {
    const response = await getData(
      `articles?limit=${pageSize}&offset=${pageSize * page}`
    );
    store.dispatch(setArticles(response.articles));
  } catch (error) {
    if (error.response) {
      store.dispatch(setErrorCode(error.response.status));
    }
    store.dispatch(setError(error.message));
  } finally {
    store.dispatch(setLoadStatus());
  }
};

export const getArticle = async (slug: string): Promise<void> => {
  store.dispatch(setLoadStatus());
  try {
    const response = await getData(`articles/${slug}`);
    store.dispatch(setArticle(response.article));
  } catch (error) {
    if (error.response) {
      store.dispatch(setErrorCode(error.response.status));
    }
    store.dispatch(setError(error.message));
  } finally {
    store.dispatch(setLoadStatus());
  }
};

export const createArticle = async (data: ICreateArticle): Promise<void> => {
  try {
    store.dispatch(setSending(true));
    const response = await postFetch(`articles`, data);
    store.dispatch(setArticle(response.article));
    store.dispatch(setSuccess(true));
    store.dispatch(setEdit(false));
  } catch (error) {
    if (error.response) {
      store.dispatch(setErrorCode(error.response.status));
    }
    store.dispatch(setError(error.message));
  } finally {
    store.dispatch(setSending(false));
  }
};

export const deleteArticle = (slug: string): void => {
  axiosApiInstance.delete(`/articles/${slug}`);
};

export const favorite = async (slug: string): Promise<void> => {
  try {
    await axiosApiInstance.post(`/articles/${slug}/favorite`);
  } catch (error) {
    if (error.response) {
      store.dispatch(setErrorCode(error.response.status));
    }
    store.dispatch(setError(error.message));
  }
};

export const unfavorite = async (slug: string): Promise<void> => {
  try {
    await axiosApiInstance.delete(`/articles/${slug}/favorite`);
  } catch (error) {
    if (error.response) {
      store.dispatch(setErrorCode(error.response.status));
    }
    store.dispatch(setError(error.message));
  }
};
