import { configureStore } from "@reduxjs/toolkit"
import { AnyAction } from "redux"
import thunkMiddleware, { ThunkDispatch } from "redux-thunk"

import { tasksSlice } from "features/todolists-list/tasks/model/tasks.slice"
import { todolistsSlice } from "features/todolists-list/todolists/model/todolists.slice"
import { appSlice } from "app/model/app.slice"
import { authSlice } from "features/auth/model/auth.slice"

export const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    todolists: todolistsSlice,
    app: appSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware),
})

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
