import { Dispatch } from "redux"
import { authAPI } from "api/auth-api"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { authActions } from "features/auth/auth-reducer"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as string | null,
  isInitialized: false,
}

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type AppInitialStateType = typeof initialState

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    },
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    setAppIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
  },
})

export const appReducer = slice.reducer
export const appActions = slice.actions

export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI
    .me()
    .then((res) => {
      // debugger
      if (res.data.resultCode === 0) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
      } else {
        handleServerAppError(dispatch, res.data)
      }
      dispatch(appActions.setAppIsInitialized({ isInitialized: true }))
    })
    .catch((error) => {
      handleServerNetworkError(dispatch, error.message)
    })
    .finally(() => {
      dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
    })
}
