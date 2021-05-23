import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArticlesState, IArticle } from "../types/article";

const initialState = {
  articles: [],
  article: null,
  page: 1,
  pageSize: 5,
  isLoading: false,
  error: null,
  isSending: false,
  success: false,
  isEdit: false,
} as ArticlesState;

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setLoadStatus(state) {
      state.isLoading = !state.isLoading;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
    },
    setArticles(state, action: PayloadAction<IArticle[]>) {
      state.articles = action.payload;
    },
    setArticle(state, action: PayloadAction<IArticle>) {
      state.article = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setSending(state, action: PayloadAction<boolean>) {
      state.isSending = action.payload;
    },
    setSuccess(state, action: PayloadAction<boolean>) {
      state.success = action.payload;
    },
    setEdit(state, action: PayloadAction<boolean>) {
      state.isEdit = action.payload;
    },
  },
});

export const {
  setPage,
  setArticles,
  setLoadStatus,
  setError,
  setArticle,
  setPageSize,
  setSending,
  setSuccess,
  setEdit,
} = articlesSlice.actions;
export default articlesSlice.reducer;
