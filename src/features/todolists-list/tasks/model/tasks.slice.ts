import { createSlice } from "@reduxjs/toolkit"

import { appActions, RequestStatusType } from "app/model/app.slice"
import { todolistsThunks } from "features/todolists-list/todolists/model/todolists.slice"
import { clearTasksAndTodolists } from "common/actions/common.actions"
import { createAppAsyncThunk } from "common/utils"
import { ResultCode, TaskPriorities, TaskStatuses } from "common/enums"
import {
  AddTaskArgType,
  DeleteTaskArgType,
  GetTasksArgType,
  tasksApi,
  TaskType,
  UpdateTaskArgType,
  UpdateTaskModelType,
} from "features/todolists-list/tasks/api"

const initialState: TasksStateType = {}

const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(tasksThunks.fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks.map((t: any) => ({ ...t, entityStatus: "idle" }))
      })
      .addCase(tasksThunks.deleteTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        // debugger
        const index = tasks.findIndex((t) => t.id === action.payload.taskId)
        if (index !== -1) tasks.splice(index, 1)
      })
      .addCase(tasksThunks.addTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.task.todoListId]
        tasks.unshift({
          ...action.payload.task,
          entityStatus: "idle",
        })
      })
      .addCase(tasksThunks.updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((task) => task.id === action.payload.taskId)
        if (index !== -1) {
          tasks[index] = {
            ...tasks[index],
            ...action.payload.domainModel,
          }
        }
      })
      .addCase(todolistsThunks.addTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todolistsThunks.deleteTodolist.fulfilled, (state, action) => {
        delete state[action.payload.todolistId]
      })
      .addCase(todolistsThunks.fetchTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = []
        })
      })
      .addCase(clearTasksAndTodolists, () => {
        return {}
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state, action) => {
          const todolistId = action.meta?.arg?.todolistId
          const taskId = action.meta?.arg?.taskId

          const tasks = state[todolistId]
          const index = tasks?.findIndex((t) => t.id === taskId)
          if (index !== -1 && tasks !== undefined) {
            tasks[index] = { ...tasks[index], entityStatus: "loading" }
          }
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state, action) => {
          const todolistId = action.meta?.arg?.todolistId
          const taskId = action.meta?.arg?.taskId

          const tasks: TaskDomainType[] = state[todolistId]
          const index = tasks?.findIndex((t) => t.id === taskId)
          if (index !== -1 && tasks !== undefined) {
            tasks[index] = { ...tasks[index], entityStatus: "succeeded" }
          }
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          const todolistId = action.meta?.arg?.todolistId
          const taskId = action.meta?.arg?.taskId

          const tasks = state[todolistId]
          const index = tasks?.findIndex((t) => t.id === taskId)
          if (index !== -1 && tasks !== undefined) {
            tasks[index] = { ...tasks[index], entityStatus: "failed" }
          }
        },
      )
  },
})

const fetchTasks = createAppAsyncThunk<{ todolistId: string; tasks: TaskType[] }, GetTasksArgType>(
  "tasks/fetchTasks",
  async (arg) => {
    const res = await tasksApi.getTasks(arg)
    return { todolistId: arg.todolistId, tasks: res.data.items }
  },
)

const deleteTask = createAppAsyncThunk<DeleteTaskArgType, DeleteTaskArgType>(
  "tasks/deleteTask",
  async (arg, { dispatch, rejectWithValue }) => {
    const res = await tasksApi.deleteTask(arg)
    if (res.data.resultCode === ResultCode.SUCCESS) {
      return arg
    } else {
      return rejectWithValue({ data: res.data, showGlobalError: false })
    }
  },
)

export const addTask = createAppAsyncThunk<{ task: TaskType }, AddTaskArgType>(
  "tasks/addTask",
  async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    const res = await tasksApi.addTask(arg)
    if (res.data.resultCode === ResultCode.SUCCESS) {
      const task = res.data.data.item
      return { task }
    } else {
      return rejectWithValue({ data: res.data, showGlobalError: false })
    }
  },
)

const updateTask = createAppAsyncThunk<UpdateTaskArgType, UpdateTaskArgType>(
  "tasks/updateTask",
  async (arg, { dispatch, getState, rejectWithValue }) => {
    const task = getState().tasks[arg.todolistId].find((t) => t.id === arg.taskId)

    if (!task) {
      dispatch(appActions.setAppError({ error: "task not found" }))
      return rejectWithValue(null)
    }

    const apiModel: UpdateTaskModelType = {
      title: task.title,
      startDate: task.startDate,
      priority: task.priority,
      description: task.description,
      deadline: task.deadline,
      status: task.status,
      ...arg.domainModel,
    }

    const res = await tasksApi.updateTask(arg.todolistId, arg.taskId, apiModel)
    if (res.data.resultCode === ResultCode.SUCCESS) {
      return arg
    } else {
      return rejectWithValue({ data: res.data, showGlobalError: true })
    }
  },
)

export const tasksSlice = slice.reducer
export const tasksThunks = { fetchTasks, deleteTask, addTask, updateTask }

// types
export type TasksStateType = {
  [key: string]: TaskDomainType[]
}

export type TaskDomainType = TaskType & {
  entityStatus: RequestStatusType
}

export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}
