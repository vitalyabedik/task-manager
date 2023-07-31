import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TasksStateType } from "app"
import { appActions, RequestStatusType } from "app/app.reducer"
import { handleServerNetworkError } from "common/utils/errors/handleServerNetworkError"
import { todolistsActions } from "features/todolistsList/model/todolists.slice"
import { clearTasksAndTodolists } from "common/actions/common.actions"
import { createAppAsyncThunk, handleServerAppError } from "common/utils"
import { ResultCode, TaskPriorities, TaskStatuses } from "common/enums"
import { tasksApi, TaskType, UpdateTaskModelType } from "features/tasks/api"

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
      .addCase(tasksThunks.fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks.map((t: any) => ({ ...t, entityStatus: "idle" }))
      })
      .addCase(tasksThunks.removeTask.fulfilled, (state, action) => {
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
        let tasksForCurrentTodoList = state[action.payload.todolistId]
        const index = tasksForCurrentTodoList.findIndex((task) => task.id === action.payload.taskId)
        if (index !== -1) {
          tasksForCurrentTodoList[index] = {
            ...tasksForCurrentTodoList[index],
            ...action.payload.domainModel,
          }
        }
      })
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

const fetchTasks = createAppAsyncThunk<{ todolistId: string; tasks: TaskType[] }, { todolistId: string }>(
  "fetchTasks",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    try {
      dispatch(appActions.setAppStatus({ status: "loading" }))
      const res = await tasksApi.getTasks(arg.todolistId)
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
      return { todolistId: arg.todolistId, tasks: res.data.items }
    } catch (error) {
      handleServerNetworkError(dispatch, error)
      return rejectWithValue(null)
    }
  },
)

const removeTask = createAppAsyncThunk<RemoveTaskArgType, RemoveTaskArgType>("removeTask", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI

  try {
    dispatch(appActions.setAppStatus({ status: "loading" }))
    dispatch(
      tasksActions.changeTaskEntityStatus({
        todolistId: arg.todolistId,
        taskId: arg.taskId,
        entityStatus: "loading",
      }),
    )
    const res = await tasksApi.deleteTask(arg.todolistId, arg.taskId)
    if (res.data.resultCode === ResultCode.SUCCESS) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
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
  } catch (error) {
    handleServerNetworkError(dispatch, error)
    return rejectWithValue(null)
  }
})

export const addTask = createAppAsyncThunk<{ task: TaskType }, AddTaskArgType>("addTask", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI

  try {
    dispatch(appActions.setAppStatus({ status: "loading" }))
    const res = await tasksApi.createTask(arg.todolistId, arg.title)
    if (res.data.resultCode === ResultCode.SUCCESS) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
      return { task: res.data.data.item }
    } else {
      handleServerAppError<{ item: TaskType }>(dispatch, res.data)
      return rejectWithValue(null)
    }
  } catch (error) {
    handleServerNetworkError(dispatch, error)
    return rejectWithValue(null)
  }
})

const updateTask = createAppAsyncThunk<UpdateTaskArgType, UpdateTaskArgType>("updateTask", async (arg, thunkAPI) => {
  const { dispatch, getState, rejectWithValue } = thunkAPI

  const task = getState().tasks[arg.todolistId].find((t) => t.id === arg.taskId)

  if (!task) {
    dispatch(appActions.setAppError({ error: "Task not found" }))
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

  try {
    dispatch(appActions.setAppStatus({ status: "loading" }))
    dispatch(
      tasksActions.changeTaskEntityStatus({
        todolistId: arg.todolistId,
        taskId: arg.taskId,
        entityStatus: "loading",
      }),
    )
    const res = await tasksApi.updateTask(arg.todolistId, arg.taskId, apiModel)
    if (res.data.resultCode === ResultCode.SUCCESS) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
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
  } catch (error) {
    handleServerNetworkError(dispatch, error)
    return rejectWithValue(null)
  } finally {
    dispatch(
      tasksActions.changeTaskEntityStatus({
        todolistId: arg.todolistId,
        taskId: arg.taskId,
        entityStatus: "idle",
      }),
    )
  }
})

export const tasksSlice = slice.reducer
export const tasksActions = slice.actions
export const tasksThunks = { fetchTasks, removeTask, addTask, updateTask }

export type RemoveTaskArgType = {
  todolistId: string
  taskId: string
}

export type AddTaskArgType = {
  todolistId: string
  title: string
}

export type UpdateTaskArgType = {
  todolistId: string
  taskId: string
  domainModel: UpdateDomainTaskModelType
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
