import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { authApi } from "features/auth/api/auth.api"
import { handleServerNetworkError } from "common/utils/errors/handleServerNetworkError"
import { AppThunk } from "app/store"
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
    builder.addCase(authThunks.login.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    })
  },
})

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>("auth/login", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI

  try {
    dispatch(appActions.setAppStatus({ status: "loading" }))
    const res = await authApi.login(arg)
    if (res.data.resultCode === ResultCode.SUCCESS) {
      // dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
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

export const logoutTC = (): AppThunk => (dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }))

  authApi
    .logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }))
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
        dispatch(clearTasksAndTodolists())
      } else {
        handleServerAppError(dispatch, res.data)
      }
    })
    .catch((error) => {
      handleServerNetworkError(dispatch, error)
    })
}

export const authSlice = slice.reducer
export const authActions = slice.actions
export const authThunks = { login }
