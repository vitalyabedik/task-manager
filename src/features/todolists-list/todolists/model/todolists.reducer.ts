import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { todolistsApi } from "features/todolists-list/todolists/api/todolists.api"
import { RequestStatusType } from "app/model/app.reducer"
import { tasksThunks } from "features/todolists-list/tasks/model/tasks.reducer"
import { clearTasksAndTodolists } from "common/actions/common.actions"
import { createAppAsyncThunk, handleServerAppError, thunkTryCatch } from "common/utils"
import { ResultCode } from "common/enums"
import {
  AddTodolistArgType,
  DeleteTodolistArgType,
  TodolistType,
  UpdateTodolistTitleArgType,
} from "features/todolists-list/todolists/api"

const initialState: TodolistDomainType[] = []

const slice = createSlice({
  name: "todolists",
  initialState,
  reducers: {
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
      .addCase(todolistsThunks.deleteTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.todolistId)
        if (index !== -1) state.splice(index, 1)
      })
      .addCase(todolistsThunks.addTodolist.fulfilled, (state, action) => {
        const newTodolist: TodolistDomainType = { ...action.payload.todolist, filter: "all", entityStatus: "idle" }
        state.unshift(newTodolist)
      })
      .addCase(todolistsThunks.updateTodolistTitle.fulfilled, (state, action) => {
        const todo = state.find((todo) => todo.id === action.payload.todolistId)
        if (todo) {
          todo.title = action.payload.title
        }
      })
      .addCase(clearTasksAndTodolists, () => {
        return []
      })
  },
})

const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }, undefined>(
  "todolists/fetchTodolists",
  async (_, thunkAPI) => {
    const { dispatch } = thunkAPI

    return thunkTryCatch(thunkAPI, async () => {
      const res = await todolistsApi.getTodolists()
      res.data.forEach((tl) => {
        dispatch(tasksThunks.fetchTasks({ todolistId: tl.id }))
      })
      const todolists = res.data
      return { todolists }
    })
  },
)

const deleteTodolist = createAppAsyncThunk<DeleteTodolistArgType, DeleteTodolistArgType>(
  "todolists/removeTodolist",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    return thunkTryCatch(thunkAPI, async () => {
      dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId: arg.todolistId, entityStatus: "loading" }))
      const res = await todolistsApi.deleteTodolist(arg)
      if (res.data.resultCode === ResultCode.SUCCESS) {
        return arg
      } else {
        dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId: arg.todolistId, entityStatus: "failed" }))
        handleServerAppError(dispatch, res.data)
        return rejectWithValue(null)
      }
    })
  },
)

const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, AddTodolistArgType>(
  "todolists/addTodolist",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    return thunkTryCatch(thunkAPI, async () => {
      const res = await todolistsApi.addTodolist(arg)
      if (res.data.resultCode === ResultCode.SUCCESS) {
        const todolist = res.data.data.item
        return { todolist }
      } else {
        handleServerAppError(dispatch, res.data)
        return rejectWithValue(null)
      }
    })
  },
)

const updateTodolistTitle = createAppAsyncThunk<UpdateTodolistTitleArgType, UpdateTodolistTitleArgType>(
  "todolists/changeTodolistTitle",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    return thunkTryCatch(thunkAPI, async () => {
      dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId: arg.todolistId, entityStatus: "loading" }))
      const res = await todolistsApi.updateTodolist(arg)
      if (res.data.resultCode === 0) {
        dispatch(
          todolistsActions.changeTodolistEntityStatus({
            todolistId: arg.todolistId,
            entityStatus: "succeeded",
          }),
        )
        return arg
      } else {
        dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId: arg.todolistId, entityStatus: "failed" }))
        handleServerAppError(dispatch, res.data)
        return rejectWithValue(null)
      }
    })
  },
)

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions
export const todolistsThunks = { fetchTodolists, deleteTodolist, addTodolist, updateTodolistTitle }

// types
export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}
