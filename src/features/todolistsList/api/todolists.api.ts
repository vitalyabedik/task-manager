import { AxiosResponse } from "axios"

import { commonApi } from "common/api/common.api"
import { ResponseType } from "common/api/common.types.api"
import {
  AddTodolistArgType,
  DeleteTodolistArgType,
  TodolistType,
  UpdateTodolistTitleArgType,
} from "features/todolistsList/api/todolists.types.api"

export const todolistsApi = {
  getTodolists() {
    return commonApi.get<TodolistType[]>(`todo-lists`)
  },
  addTodolist(arg: AddTodolistArgType) {
    return commonApi.post<
      ResponseType<{ item: TodolistType }>,
      AxiosResponse<ResponseType<{ item: TodolistType }>>,
      { title: string }
    >(`todo-lists`, { title: arg.title })
  },
  deleteTodolist(arg: DeleteTodolistArgType) {
    return commonApi.delete<ResponseType>(`todo-lists/${arg.todolistId}`)
  },
  updateTodolist(arg: UpdateTodolistTitleArgType) {
    return commonApi.put<ResponseType, AxiosResponse<ResponseType>, { title: string }>(`todo-lists/${arg.todolistId}`, {
      title: arg.title,
    })
  },
}
