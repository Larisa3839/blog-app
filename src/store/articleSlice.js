import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { getCookie } from '../utils/cookie'

export const fetchGetArticles = createAsyncThunk('articles/fetchGetArticles', async ({ limit, offset }) => {
  const res = await axios.get('https://blog.kata.academy/api/articles', {
    params: { limit, offset },
    headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: `Token ${getCookie('token')}` },
  })
  return res.data
})

export const fetchSingleArticle = createAsyncThunk('articles/fetchSingleArticle', async (slug) => {
  const res = await axios.get(`https://blog.kata.academy/api/articles/${slug}`)
  return res.data
})

export const fetchCreateArticle = createAsyncThunk(
  'articles/fetchCreateArticle',
  async ({ title, description, text, tagList }) => {
    const res = await axios.post(
      'https://blog.kata.academy/api/articles',
      {
        article: { title, description, body: text, tagList },
      },
      {
        headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: `Token ${getCookie('token')}` },
      }
    )
    console.log(res.data)
    return res.data
  }
)

export const fetchEditArticle = createAsyncThunk(
  'articles/fetchEditArticle',
  async ({ slug, title, description, body, tagList }) => {
    const res = await axios.put(
      `https://blog.kata.academy/api/articles/${slug}`,
      {
        article: { title, description, body, tagList },
      },
      {
        headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: `Token ${getCookie('token')}` },
      }
    )
    console.log(res.data)
    return res.data
  }
)

export const fetchDeleteArticle = createAsyncThunk('articles/fetchDeleteArticle', async (slug) => {
  const res = await axios.delete(`https://blog.kata.academy/api/articles/${slug}`, {
    headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: `Token ${getCookie('token')}` },
  })
  return res.data
})

export const fetchSetFavoriteArticle = createAsyncThunk('articles/fetchSetFavoriteArticle', async (slug) => {
  const res = await axios.post(
    `https://blog.kata.academy/api/articles/${slug}/favorite`,
    {},
    {
      headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: `Token ${getCookie('token')}` },
    }
  )
  return res.data
})

export const fetchDeleteFavoriteArticle = createAsyncThunk('articles/fetchDeleteFavoriteArticle', async (slug) => {
  const res = await axios.delete(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
    headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: `Token ${getCookie('token')}` },
  })
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
    articleIsCreated: false,
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
    [fetchCreateArticle.pending]: (state) => {
      state.isErrorArticlesRequest = false
    },
    [fetchCreateArticle.rejected]: (state) => {
      state.isErrorArticlesRequest = true
      state.articleIsCreated = false
    },
    [fetchCreateArticle.fulfilled]: (state) => {
      state.isErrorArticlesRequest = false
      state.articleIsCreated = true
    },
  },
})

// eslint-disable-next-line no-empty-pattern
export const {} = articleSlice.actions
export default articleSlice.reducer
