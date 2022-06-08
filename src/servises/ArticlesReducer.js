/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  articles: [],
  article: [],
  status: "idle",
  offset: 0,
  stopFetch: "false",
  error: null,
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    actionArticles(state, action) {
      state.articles = action.payload.articles;
    },
    nextPage(state, action) {
      state.offset = (action.payload - 1) * 5;
    },
    getArticle(state, action) {
      state.article = action.payload.article;
    },
  },
});
export const { actionArticles, nextPage, getArticle } = articlesSlice.actions;
export default articlesSlice.reducer;
