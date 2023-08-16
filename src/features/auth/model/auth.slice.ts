import { createSlice } from "@reduxjs/toolkit"

import { authApi } from "features/auth/api/auth.api"
import { appActions } from "app/model/app.slice"
import { clearTasksAndTodolists } from "common/actions/common.actions"
import { createAppAsyncThunk } from "common/utils"
import { LoginParamsType } from "features/auth/api/auth.api.types"
import { ResultCode } from "common/enums"

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
  },
})

const login = createAppAsyncThunk<AuthArgType, LoginParamsType>(
  "auth/login",
  async (arg, { dispatch, rejectWithValue }) => {
    const res = await authApi.login(arg)
    if (res.data.resultCode === ResultCode.SUCCESS) {
      return { isLoggedIn: true }
    } else {
      const isShowAppError = !res.data.fieldsErrors.length
      return rejectWithValue({ data: res.data, showGlobalError: isShowAppError })
    }
  },
)

const logout = createAppAsyncThunk<AuthArgType, undefined>("auth/logout", async (_, { dispatch, rejectWithValue }) => {
  const res = await authApi.logout()
  if (res.data.resultCode === ResultCode.SUCCESS) {
    dispatch(clearTasksAndTodolists())
    return { isLoggedIn: false }
  } else {
    return rejectWithValue({ data: res.data, showGlobalError: false })
  }
})

const initializeApp = createAppAsyncThunk<AuthArgType, undefined>(
  "app/initializeApp",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await authApi.me()
      if (res.data.resultCode === ResultCode.SUCCESS) {
        return { isLoggedIn: true }
      } else {
        return rejectWithValue({ data: res.data, showGlobalError: false })
      }
    } finally {
      dispatch(appActions.setAppIsInitialized({ isInitialized: true }))
    }
  },
)

export const authSlice = slice.reducer
export const authThunks = { login, logout, initializeApp }

export type AuthArgType = {
  isLoggedIn: boolean
}