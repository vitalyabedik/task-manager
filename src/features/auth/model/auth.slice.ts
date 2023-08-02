import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { authApi } from "features/auth/api/auth.api"
import { handleServerNetworkError } from "common/utils/errors/handleServerNetworkError"
import { appActions } from "app/app.reducer"
import { clearTasksAndTodolists } from "common/actions/common.actions"
import { createAppAsyncThunk, handleServerAppError } from "common/utils"
import { LoginParamsType } from "features/auth/api/auth.types.api"
import { ResultCode } from "common/enums"

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
  },
})

const login = createAppAsyncThunk<AuthArgType, LoginParamsType>("auth/login", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI

  try {
    dispatch(appActions.setAppStatus({ status: "loading" }))
    const res = await authApi.login(arg)
    if (res.data.resultCode === ResultCode.SUCCESS) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
      return { isLoggedIn: true }
    } else {
      handleServerAppError(dispatch, res.data)
      return rejectWithValue(null)
    }
  } catch (error) {
    handleServerNetworkError(dispatch, error)
    return rejectWithValue(null)
  }
})

const logout = createAppAsyncThunk<AuthArgType, void>("auth/logout", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI

  try {
    dispatch(appActions.setAppStatus({ status: "loading" }))
    const res = await authApi.logout()
    if (res.data.resultCode === ResultCode.SUCCESS) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
      dispatch(clearTasksAndTodolists())
      return { isLoggedIn: false }
    } else {
      handleServerAppError(dispatch, res.data)
      return rejectWithValue(null)
    }
  } catch (error) {
    handleServerNetworkError(dispatch, error)
    return rejectWithValue(null)
  }
})

export const authSlice = slice.reducer
export const authActions = slice.actions
export const authThunks = { login, logout }

export type AuthArgType = {
  isLoggedIn: boolean
}
