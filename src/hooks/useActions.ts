import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setPage,
  setArticles,
  setLoadStatus,
  setError,
  setArticle,
  setPageSize,
  setSending,
  setEdit,
  setSuccess,
} from "../slices/articles";
import {
  setFetchStatus,
  setAuthStatus,
  setErrors,
  setUser,
  setErrorCode,
  setUserSuccess,
} from "../slices/user";

import type { AppDispatch } from "../store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(
    {
      setPage,
      setArticles,
      setLoadStatus,
      setError,
      setArticle,
      setPageSize,
      setSending,
      setEdit,
      setSuccess,
      setFetchStatus,
      setAuthStatus,
      setErrors,
      setUser,
      setErrorCode,
      setUserSuccess,
    },
    dispatch
  );
};
