import { getData } from "../api";
import {
  setLoadStatus,
  setArticles,
  setError,
  setArticle,
} from "../slices/articles";
import { store } from "../store";

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
    console.log(error);
    store.dispatch(setError(error.response.errors));
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
    console.log(error);
    store.dispatch(setError(error.response.errors));
  } finally {
    store.dispatch(setLoadStatus());
  }
};
