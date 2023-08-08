import { configureStore } from "@reduxjs/toolkit"
import { AnyAction, combineReducers } from "redux"
import thunkMiddleware, { ThunkDispatch } from "redux-thunk"

import { tasksReducer } from "features/todolists-list/tasks/model/tasks.reducer"
import { todolistsReducer } from "features/todolists-list/todolists/model/todolists.reducer"
import { appReducer } from "app/model/app.reducer"
import { authReducer } from "features/auth/model/auth.reducer"

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware),
})

export type AppRootReducerType = typeof rootReducer
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
