import { store } from "../store";
import {
  setArticles,
  setLoadStatus,
  setError,
  setArticle,
} from "../slices/articles";
import axios, { AxiosResponse } from "axios";

export const ROOT_API_URL = "https://conduit.productionready.io/api/";

export const getArticles = async (pageSize: number): Promise<void> => {
  store.dispatch(setLoadStatus());
  try {
    const response: AxiosResponse<any> = await axios.get(
      `${ROOT_API_URL}articles?limit=${pageSize}`
    );
    store.dispatch(setArticles(response.data.articles));
  } catch (e) {
    console.log(e);
    store.dispatch(setError("error"));
  } finally {
    store.dispatch(setLoadStatus());
  }
};

export const getArticle = async (slug: string): Promise<void> => {
  store.dispatch(setLoadStatus());
  try {
    const response: AxiosResponse<any> = await axios.get(
      `${ROOT_API_URL}articles/${slug}`
    );
    store.dispatch(setArticle(response.data.article));
  } catch (e) {
    console.log(e);
    store.dispatch(setError("error"));
  } finally {
    store.dispatch(setLoadStatus());
  }
};
