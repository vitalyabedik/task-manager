import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { appActions, RequestStatusType } from "app/app.reducer"
import { todolistsThunks } from "features/todolists-list/todolists/model/todolists.reducer"
import { clearTasksAndTodolists } from "common/actions/common.actions"
import { createAppAsyncThunk, handleServerAppError } from "common/utils"
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
import { thunkTryCatch } from "common/utils/thunkTryCatch/thunkTryCatch"

const initialState: TasksStateType = {}

const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    changeTaskEntityStatus: (
      state,
      action: PayloadAction<{ todolistId: string; taskId: string; entityStatus: RequestStatusType }>,
    ) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((t) => t.id === action.payload.taskId)
      if (index !== -1) {
        tasks[index] = { ...tasks[index], entityStatus: action.payload.entityStatus }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(tasksThunks.getTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks.map((t: any) => ({ ...t, entityStatus: "idle" }))
      })
      .addCase(tasksThunks.deleteTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
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
      .addCase(todolistsThunks.removeTodolist.fulfilled, (state, action) => {
        delete state[action.payload.todolistId]
      })
      .addCase(todolistsThunks.getTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = []
        })
      })
      .addCase(clearTasksAndTodolists, () => {
        return {}
      })
  },
})

const getTasks = createAppAsyncThunk<{ todolistId: string; tasks: TaskType[] }, GetTasksArgType>(
  "tasks/fetchTasks",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await tasksApi.getTasks(arg)
      return { todolistId: arg.todolistId, tasks: res.data.items }
    })
  },
)

const deleteTask = createAppAsyncThunk<DeleteTaskArgType, DeleteTaskArgType>(
  "tasks/removeTask",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    return thunkTryCatch(thunkAPI, async () => {
      dispatch(
        tasksActions.changeTaskEntityStatus({
          todolistId: arg.todolistId,
          taskId: arg.taskId,
          entityStatus: "loading",
        }),
      )
      const res = await tasksApi.deleteTask(arg)
      if (res.data.resultCode === ResultCode.SUCCESS) {
        return arg
      } else {
        handleServerAppError(dispatch, res.data)
        dispatch(
          tasksActions.changeTaskEntityStatus({
            todolistId: arg.todolistId,
            taskId: arg.taskId,
            entityStatus: "failed",
          }),
        )
        return rejectWithValue(null)
      }
    })
  },
)

export const addTask = createAppAsyncThunk<{ task: TaskType }, AddTaskArgType>(
  "tasks/addTask",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    return thunkTryCatch(thunkAPI, async () => {
      const res = await tasksApi.addTask(arg)
      if (res.data.resultCode === ResultCode.SUCCESS) {
        const task = res.data.data.item
        return { task }
      } else {
        handleServerAppError<{ item: TaskType }>(dispatch, res.data)
        return rejectWithValue(null)
      }
    })
  },
)

const updateTask = createAppAsyncThunk<UpdateTaskArgType, UpdateTaskArgType>(
  "tasks/updateTask",
  async (arg, thunkAPI) => {
    const { dispatch, getState, rejectWithValue } = thunkAPI

    return thunkTryCatch(thunkAPI, async () => {
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

      dispatch(
        tasksActions.changeTaskEntityStatus({
          todolistId: arg.todolistId,
          taskId: arg.taskId,
          entityStatus: "loading",
        }),
      )
      const res = await tasksApi.updateTask(arg.todolistId, arg.taskId, apiModel)
      if (res.data.resultCode === ResultCode.SUCCESS) {
        dispatch(
          tasksActions.changeTaskEntityStatus({
            todolistId: arg.todolistId,
            taskId: arg.taskId,
            entityStatus: "succeeded",
          }),
        )

        return arg
      } else {
        handleServerAppError(dispatch, res.data)
        return rejectWithValue(null)
      }
    })
  },
)

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const tasksThunks = { getTasks, deleteTask, addTask, updateTask }

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
