import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { Dispatch } from "redux"

import { todolistsApi } from "features/todolistsList/api/todolists.api"
import { appActions, RequestStatusType } from "app/app.reducer"
import { handleServerNetworkError } from "common/utils/errors/handleServerNetworkError"
import { tasksThunks } from "features/tasks/model/tasks.slice"
import { clearTasksAndTodolists } from "common/actions/common.actions"
import { createAppAsyncThunk, handleServerAppError } from "common/utils"
import { ResultCode } from "common/enums"
import { ErrorType } from "common/api"
import { TodolistType } from "features/todolistsList/api"

const initialState: TodolistDomainType[] = []

const slice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // removeTodolist: (state, action: PayloadAction<{ todolistId: string }>) => {
    //   const index = state.findIndex((todo) => todo.id === action.payload.todolistId)
    //   if (index !== -1) state.splice(index, 1)
    // },
    addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      const newTodolist: TodolistDomainType = { ...action.payload.todolist, filter: "all", entityStatus: "idle" }
      state.unshift(newTodolist)
    },
    changeTodolistTitle: (state, action: PayloadAction<{ todolistId: string; title: string }>) => {
      const todo = state.find((todo) => todo.id === action.payload.todolistId)
      if (todo) {
        todo.title = action.payload.title
      }
    },
    changeTodolistFilter: (state, action: PayloadAction<{ todolistId: string; filter: FilterValuesType }>) => {
      const todo = state.find((todo) => todo.id === action.payload.todolistId)
      if (todo) {
        todo.filter = action.payload.filter
      }
    },
    changeTodolistEntityStatus: (
      state,
      action: PayloadAction<{ todolistId: string; entityStatus: RequestStatusType }>,
    ) => {
      const todo = state.find((todo) => todo.id === action.payload.todolistId)
      if (todo) {
        todo.entityStatus = action.payload.entityStatus
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(todolistsThunks.fetchTodolists.fulfilled, (state, action) => {
        return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
      })
      .addCase(todolistsThunks.removeTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.todolistId)
        if (index !== -1) state.splice(index, 1)
      })
      .addCase(clearTasksAndTodolists, () => {
        return []
      })
  },
})

const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }, {}>(
  "todolists/fetchTodolists",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    try {
      dispatch(appActions.setAppStatus({ status: "loading" }))
      const res = await todolistsApi.getTodolists()
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
      res.data.forEach((tl) => {
        dispatch(tasksThunks.fetchTasks({ todolistId: tl.id }))
      })
      return { todolists: res.data }
    } catch (error) {
      handleServerNetworkError(dispatch, error)
      return rejectWithValue(null)
    }
  },
)

const removeTodolist = createAppAsyncThunk<RemoveTodolistArgType, RemoveTodolistArgType>(
  "todolists/removeTodolist",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    try {
      dispatch(appActions.setAppStatus({ status: "loading" }))
      dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId: arg.todolistId, entityStatus: "loading" }))
      const res = await todolistsApi.deleteTodolist(arg.todolistId)
      if (res.data.resultCode === ResultCode.SUCCESS) {
        // dispatch(todolistsActions.removeTodolist({ todolistId }))
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
        return arg
      } else {
        dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId: arg.todolistId, entityStatus: "failed" }))
        handleServerAppError(dispatch, res.data)
        return rejectWithValue(null)
      }
    } catch (error) {
      handleServerNetworkError(dispatch, error)
      return rejectWithValue(null)
    }
  },
)

// export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
//   dispatch(appActions.setAppStatus({ status: "loading" }))
//   dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, entityStatus: "loading" }))
//   todolistsApi
//     .deleteTodolist(todolistId)
//     .then((res) => {
//       if (res.data.resultCode === ResultCode.SUCCESS) {
//         dispatch(todolistsActions.removeTodolist({ todolistId }))
//         dispatch(appActions.setAppStatus({ status: "succeeded" }))
//       } else {
//         handleServerAppError(dispatch, res.data)
//       }
//     })
//     .catch((e: AxiosError<ErrorType>) => {
//       const error = e.response ? e.response?.data.messages[0].message : e.message
//       handleServerNetworkError(dispatch, error)
//     })
// }

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }))
  todolistsApi
    .createTodolist(title)
    .then((res) => {
      if (res.data.resultCode === ResultCode.SUCCESS) {
        dispatch(todolistsActions.addTodolist({ todolist: res.data.data.item }))
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
      } else {
        handleServerAppError(dispatch, res.data)
      }
    })
    .catch((e: AxiosError<ErrorType>) => {
      const error = e.response ? e.response?.data.messages[0].message : e.message
      handleServerNetworkError(dispatch, error)
    })
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }))
  dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, entityStatus: "loading" }))
  todolistsApi
    .updateTodolist(todolistId, title)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(todolistsActions.changeTodolistTitle({ todolistId, title }))
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
        dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, entityStatus: "succeeded" }))
      } else {
        handleServerAppError(dispatch, res.data)
      }
    })
    .catch((e: AxiosError<ErrorType>) => {
      const error = e.response ? e.response?.data.messages[0].message : e.message
      handleServerNetworkError(dispatch, error)
    })
}

export const todolistsSlice = slice.reducer
export const todolistsActions = slice.actions
export const todolistsThunks = { fetchTodolists, removeTodolist }

// types
export type FilterValuesType = "all" | "active" | "completed"

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

export type RemoveTodolistArgType = { todolistId: string }
