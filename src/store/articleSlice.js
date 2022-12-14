import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchGetArticles = createAsyncThunk('articles/fetchGetArticles', async ({ limit, offset }) => {
  const res = await axios.get('https://blog.kata.academy/api/articles', {
    params: {
      limit,
      offset,
    },
  })
  return res.data
})

export const fetchSingleArticle = createAsyncThunk('articles/fetchSingleArticle', async (slug) => {
  const res = await axios.get(`https://blog.kata.academy/api/articles/${slug}`)
  return res.data
})
const articleSlice = createSlice({
  name: 'article',
  initialState: {
    articles: [],
    singleArticle: null,
    isErrorArticlesRequest: false,
    isLoadingArticles: false,
    articlesCount: null,
  },
  reducers: {},
  extraReducers: {
    [fetchGetArticles.pending]: (state) => {
      state.isLoadingArticles = true
    },
    [fetchGetArticles.rejected]: (state) => {
      state.isErrorArticlesRequest = true
      state.isLoadingArticles = false
    },
    [fetchGetArticles.fulfilled]: (state, action) => {
      state.articles = [...action.payload.articles]
      state.isLoadingArticles = false
      state.articlesCount = action.payload.articlesCount
    },
    [fetchSingleArticle.pending]: (state) => {
      state.isLoadingArticles = true
    },
    [fetchSingleArticle.rejected]: (state) => {
      state.isErrorArticlesRequest = true
      state.isLoadingArticles = false
    },
    [fetchSingleArticle.fulfilled]: (state, action) => {
      state.singleArticle = { ...action.payload.article }
      state.isLoadingArticles = false
    },
  },
})

// eslint-disable-next-line no-empty-pattern
export const {} = articleSlice.actions
export default articleSlice.reducer
