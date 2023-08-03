import { configureStore } from "@reduxjs/toolkit"
import { AnyAction, combineReducers } from "redux"
import thunkMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk"

import { tasksSlice } from "features/tasks/model/tasks.slice"
import { todolistsSlice } from "features/todolistsList/model/todolists.slice"
import { appSlice } from "app/app.slice"
import { authSlice } from "features/auth/model/auth.slice"

const rootReducer = combineReducers({
  tasks: tasksSlice,
  todolists: todolistsSlice,
  app: appSlice,
  auth: authSlice,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware),
})

export type AppRootReducerType = typeof rootReducer
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>

// @ts-ignore
window.store = store
