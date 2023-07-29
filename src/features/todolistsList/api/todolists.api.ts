import { AxiosResponse } from "axios"

import { commonApi } from "common/api/common.api"
import { ResponseType } from "common/api/common.types.api"
import { TodolistType } from "features/todolistsList/api/todolists.types.api"

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
}
