import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { deleteCookie, getCookie } from '../utils/cookie'

export const fetchLoginUser = createAsyncThunk('user/fetchLoginUser', async ({ email, password }) => {
  const res = await axios.post(
    'https://blog.kata.academy/api/users/login',
    {
      user: {
        email,
        password,
      },
    },
    {
      headers: { 'Content-Type': 'application/json' },
    }
  )
  console.log(res)
  return res.data
})

export const fetchCreateUser = createAsyncThunk('user/fetchCreateUser', async ({ username, email, password }) => {
  const res = await axios.post(
    'https://blog.kata.academy/api/users',
    {
      user: {
        username,
        email,
        password,
      },
    },
    {
      headers: { 'Content-Type': 'application/json' },
    }
  )
  return res.data
})

export const fetchUpdateUser = createAsyncThunk(
  'user/fetchUpdateUser',
  async ({ username, email, password, image }) => {
    const res = await axios.put(
      'https://blog.kata.academy/api/user',
      {
        user: {
          username,
          email,
          password,
          image,
        },
      },
      {
        headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: `Token ${getCookie('token')}` },
      }
    )
    return res.data
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    email: '',
    bio: '',
    image: '',
    userRequestSuccess: false,
    isErrorUserRequest: false,
  },
  reducers: {
    logOut(state) {
      state.username = ''
      state.email = ''
      state.bio = ''
      state.image = ''
      state.userRequestStatus = ''
      deleteCookie('token')
    },
    setSuccessRequest(state) {
      state.userRequestSuccess = false
    },
    resetUserError(state) {
      state.isErrorUserRequest = false
    },
  },
  extraReducers: {
    [fetchLoginUser.pending]: (state) => {
      state.userRequestSuccess = false
    },
    [fetchLoginUser.fulfilled]: (state, action) => {
      state.username = action.payload.user.username
      state.email = action.payload.user.email
      state.bio = action.payload.user.bio
      state.image = action.payload.user.image
      document.cookie = `token = ${action.payload.user.token}`
      state.userRequestSuccess = true
    },
    [fetchLoginUser.rejected]: (state) => {
      state.isErrorUserRequest = true
    },
    [fetchCreateUser.pending]: (state) => {
      state.userRequestSuccess = false
    },
    [fetchCreateUser.fulfilled]: (state, action) => {
      state.username = action.payload.user.username
      state.email = action.payload.user.email
      state.bio = action.payload.user.bio
      state.image = action.payload.user.image
      document.cookie = `token = ${action.payload.user.token}`
      state.userRequestSuccess = true
    },
    [fetchCreateUser.rejected]: (state) => {
      state.isErrorUserRequest = true
    },
    [fetchUpdateUser.pending]: (state) => {
      state.userRequestSuccess = false
    },
    [fetchUpdateUser.fulfilled]: (state, action) => {
      state.username = action.payload.user.username
      state.email = action.payload.user.email
      state.bio = action.payload.user.bio
      state.image = action.payload.user.image
      state.userRequestSuccess = true
    },
    [fetchUpdateUser.rejected]: (state) => {
      state.isErrorUserRequest = true
    },
  },
})

// eslint-disable-next-line no-empty-pattern
export const { logOut, setSuccessRequest, resetUserError } = userSlice.actions
export default userSlice.reducer
