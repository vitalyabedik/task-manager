import { AxiosError } from "axios"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Dispatch } from "redux"

import { AppRootStateType } from "app/store"
import {
  ErrorType,
  ResultCode,
  TaskPriorities,
  TaskStatuses,
  TaskType,
  todolistAPI,
  UpdateTaskModelType,
} from "api/todolist-api"
import { TasksStateType } from "app"
import { appActions, RequestStatusType } from "app/app-reducer"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { todolistsActions } from "features/TodolistsList/todolists-reducer"
import { clearTasksAndTodolists } from "common/actions/common.actions"

const initialState: TasksStateType = {}

const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    removeTask: (state, action: PayloadAction<{ todolistId: string; taskId: string }>) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((t) => t.id === action.payload.taskId)
      if (index !== -1) tasks.splice(index, 1)
    },
    addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
      const tasks = state[action.payload.task.todoListId]
      tasks.unshift({
        ...action.payload.task,
        entityStatus: "idle",
      })
    },
    updateTask: (
      state,
      action: PayloadAction<{ todolistId: string; taskId: string; model: UpdateDomainTaskModelType }>,
    ) => {
      const tasks = state[action.payload.todolistId]
      const updatedTasks = tasks.map((task) => {
        if (task.id === action.payload.taskId) {
          return { ...task, ...action.payload.model }
        }
        return task
      })
      state[action.payload.todolistId] = updatedTasks
    },
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
    setTasks: (state, action: PayloadAction<{ todolistId: string; tasks: TaskType[] }>) => {
      state[action.payload.todolistId] = action.payload.tasks.map((t) => ({ ...t, entityStatus: "idle" }))
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(todolistsActions.addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todolistsActions.removeTodolist, (state, action) => {
        delete state[action.payload.todolistId]
      })
      .addCase(todolistsActions.setTodolists, (state, action) => {
        action.payload.todolists.forEach((tl: any) => {
          state[tl.id] = []
        })
      })
      .addCase(clearTasksAndTodolists, () => {
        return {}
      })
  },
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions

// thunk creators
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }))
  todolistAPI
    .getTodolistTasks(todolistId)
    .then((res) => {
      dispatch(tasksActions.setTasks({ todolistId, tasks: res.data.items }))
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
    })
    .catch((e: AxiosError<ErrorType>) => {
      const error = e.response ? e.response?.data.messages[0].message : e.message
      handleServerNetworkError(dispatch, error)
    })
}

export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }))
  dispatch(tasksActions.changeTaskEntityStatus({ todolistId, taskId, entityStatus: "loading" }))
  todolistAPI
    .deleteTodolistTask(todolistId, taskId)
    .then((res) => {
      if (res.data.resultCode === ResultCode.SUCCESS) {
        dispatch(tasksActions.removeTask({ todolistId, taskId }))
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

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }))
  todolistAPI
    .createTodolistTask(todolistId, title)
    .then((res) => {
      if (res.data.resultCode === ResultCode.SUCCESS) {
        dispatch(tasksActions.addTask({ task: res.data.data.item }))
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
      } else {
        handleServerAppError<{ item: TaskType }>(dispatch, res.data)
      }
    })
    .catch((e: AxiosError<ErrorType>) => {
      const error = e.response ? e.response?.data.messages[0].message : e.message
      handleServerNetworkError(dispatch, error)
    })
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => {
  return (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistId].find((t) => t.id === taskId)

    if (task) {
      const apiModel: UpdateTaskModelType = {
        title: task.title,
        startDate: task.startDate,
        priority: task.priority,
        description: task.description,
        deadline: task.deadline,
        status: task.status,
        ...domainModel,
      }

      dispatch(appActions.setAppStatus({ status: "loading" }))
      dispatch(tasksActions.changeTaskEntityStatus({ todolistId, taskId, entityStatus: "loading" }))
      todolistAPI
        .updateTodolistTask(todolistId, taskId, apiModel)
        .then((res) => {
          if (res.data.resultCode === ResultCode.SUCCESS) {
            dispatch(tasksActions.updateTask({ todolistId, taskId, model: domainModel }))
            dispatch(appActions.setAppStatus({ status: "succeeded" }))
            dispatch(tasksActions.changeTaskEntityStatus({ todolistId, taskId, entityStatus: "succeeded" }))
          } else {
            handleServerAppError(dispatch, res.data)
          }
        })
        .catch((e: AxiosError<ErrorType>) => {
          const error = e.response ? e.response?.data.messages[0].message : e.message
          handleServerNetworkError(dispatch, error)
        })
    }
  }
}

// types
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
