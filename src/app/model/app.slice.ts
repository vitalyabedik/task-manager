import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { isARejectedTodolistsAction } from "features/todolists-list/todolists/model/todolists.slice"

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
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading"
        },
      )
      .addMatcher(
        (action) => {
          return action.type.endsWith("/rejected")
        },
        (state, action) => {
          const { payload, error } = action
          if (payload) {
            if (payload.showGlobalError) {
              state.error = payload.data.messages.length ? payload.data.messages[0] : "Some error occurred"
            }
          } else {
            state.error = error.message ? error.message : "Some error occurred"
          }
          state.status = "failed"
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.status = "succeeded"
        },
      )
      .addMatcher(
        (action) => isARejectedTodolistsAction(action),
        (state) => {
          state.status = "loading"
        },
      )
  },
})

export const appSlice = slice.reducer
export const appActions = slice.actions
