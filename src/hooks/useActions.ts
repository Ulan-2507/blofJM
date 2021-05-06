import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setPage,
  setArticles,
  setLoadStatus,
  setError,
  setArticle,
  setPageSize,
} from "../slices/articles";
import type { AppDispatch } from "../store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(
    { setPage, setArticles, setLoadStatus, setError, setArticle, setPageSize },
    dispatch
  );
};
