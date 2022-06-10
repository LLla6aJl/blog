/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  articles: [],
  article: {
    slug: "",
    title: "",
    description: "",
    body: "",
    createdAt: "",
    updatedAt: "",
    favorited: false,
    favoritesCount: 0,
    tagList: [],
  },
  edit: false,
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
      state.offset = 0;
    },
    likeArticleAction(state, action) {
      state.article.favorited = action.payload.article.favorited;
      if (action.payload.article.favorited) {
        state.article.favoritesCount++;
      } else {
        state.article.favoritesCount--;
      }
    },
  },
});
export const { actionArticles, nextPage, getArticle, likeArticleAction } =
  articlesSlice.actions;
export default articlesSlice.reducer;
