import React from "react"
import { Provider } from "react-redux"
import thunkMiddleware from "redux-thunk"
import { v1 } from "uuid"
import { configureStore } from "@reduxjs/toolkit"
import { HashRouter } from "react-router-dom"

import { AppRootStateType } from "app/model/store"
import { tasksSlice } from "features/todolists-list/tasks/model/tasks.slice"
import { todolistsSlice } from "features/todolists-list/todolists/model/todolists.slice"
import { appSlice } from "app/model/app.slice"
import { authSlice } from "features/auth/model/auth.slice"
import { TaskPriorities, TaskStatuses } from "common/enums"

const initialGlobalState: AppRootStateType = {
  todolists: [
    { id: "todolistId1", title: "What to learn", filter: "all", addedDate: "", order: 0, entityStatus: "idle" },
    { id: "todolistId2", title: "What to buy", filter: "all", addedDate: "", order: 0, entityStatus: "idle" },
  ],
  tasks: {
    todolistId1: [
      {
        id: v1(),
        title: "HTML&CSS",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        entityStatus: "idle",
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
        description: "",
      },
      {
        id: v1(),
        title: "JS",
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Low,
        entityStatus: "idle",
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
        description: "",
      },
    ],
    todolistId2: [
      {
        id: v1(),
        title: "Milk",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        entityStatus: "idle",
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "",
        description: "",
      },
      {
        id: v1(),
        title: "React Book",
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Low,
        entityStatus: "idle",
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "",
        description: "",
      },
    ],
  },
  app: {
    status: "succeeded",
    error: null,
    isInitialized: true,
  },
  auth: {
    isLoggedIn: true,
    captchaUrl: "",
  },
}

export const storyBookStore = configureStore({
  reducer: {
    tasks: tasksSlice,
    todolists: todolistsSlice,
    app: appSlice,
    auth: authSlice,
  },
  preloadedState: initialGlobalState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware),
})

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}

export const BrowserRouterDecorator = (storyFn: () => React.ReactNode) => {
  return <HashRouter>{storyFn()}</HashRouter>
}
