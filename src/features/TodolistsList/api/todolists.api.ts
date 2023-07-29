import { AxiosResponse } from "axios"

import { commonApi } from "common/api/common.api"
import { TaskPriorities, TaskStatuses } from "common/enums"
import { ResponseType } from "common/api/common.types.api"

export const todolistsApi = {
  getTodolists() {
    return commonApi.get<TodolistType[]>(`todo-lists`)
  },
  createTodolist(title: string) {
    return commonApi.post<
      ResponseType<{ item: TodolistType }>,
      AxiosResponse<ResponseType<{ item: TodolistType }>>,
      { title: string }
    >(`todo-lists`, { title })
  },
  deleteTodolist(todolistId: string) {
    return commonApi.delete<ResponseType>(`todo-lists/${todolistId}`)
  },
  updateTodolist(todolistId: string, title: string) {
    return commonApi.put<ResponseType, AxiosResponse<ResponseType>, { title: string }>(`todo-lists/${todolistId}`, {
      title,
    })
  },
  getTodolistTasks(todolistId: string) {
    return commonApi.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },
  createTodolistTask(todolistId: string, title: string) {
    return commonApi.post<
      ResponseType<{ item: TaskType }>,
      AxiosResponse<ResponseType<{ item: TaskType }>>,
      { title: string }
    >(`/todo-lists/${todolistId}/tasks`, { title })
  },
  deleteTodolistTask(todolistId: string, taskId: string) {
    return commonApi.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTodolistTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return commonApi.put<
      ResponseType<{ item: TaskType }>,
      AxiosResponse<ResponseType<{ item: TaskType }>>,
      UpdateTaskModelType
    >(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
}

// types
export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: TaskType[]
}

export type TaskType = {
  description: string
  title: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}
export type UpdateTaskModelType = {
  title: string
  description: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
}

export type ErrorType = {
  statusCode: number
  messages: [
    {
      message: string
      field: string
    },
  ]
  error: string
}
