import { configureStore } from "@reduxjs/toolkit"
import { AnyAction, combineReducers } from "redux"
import thunkMiddleware, { ThunkDispatch } from "redux-thunk"

import { tasksSlice } from "features/todolists-list/tasks/model/tasks.slice"
import { todolistsSlice } from "features/todolists-list/todolists/model/todolists.slice"
import { appSlice } from "app/model/app.slice"
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
