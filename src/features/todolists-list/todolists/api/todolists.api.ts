import { AxiosResponse } from "axios"

import { commonApi } from "common/api/common.api"
import { BaseResponseType } from "common/api/common.api.types"
import {
  AddTodolistArgType,
  DeleteTodolistArgType,
  TodolistType,
  UpdateTodolistTitleArgType,
} from "features/todolists-list/todolists/api/todolists.api.types"

export const todolistsApi = {
  getTodolists() {
    return commonApi.get<TodolistType[]>(`todo-lists`)
  },
  addTodolist(arg: AddTodolistArgType) {
    return commonApi.post<
      BaseResponseType<{ item: TodolistType }>,
      AxiosResponse<BaseResponseType<{ item: TodolistType }>>,
      { title: string }
    >(`todo-lists`, { title: arg.title })
  },
  deleteTodolist(arg: DeleteTodolistArgType) {
    return commonApi.delete<BaseResponseType>(`todo-lists/${arg.todolistId}`)
  },
  updateTodolist(arg: UpdateTodolistTitleArgType) {
    return commonApi.put<BaseResponseType, AxiosResponse<BaseResponseType>, { title: string }>(
      `todo-lists/${arg.todolistId}`,
      {
        title: arg.title,
      },
    )
  },
}
