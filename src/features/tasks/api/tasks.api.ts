import { AxiosResponse } from "axios"

import { commonApi } from "common/api/common.api"
import { ResponseType } from "common/api/common.types.api"
import { GetTasksResponse, TaskType, UpdateTaskModelType } from "features/tasks/api/tasks.types.api"

export const tasksApi = {
  getTasks(todolistId: string) {
    return commonApi.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, title: string) {
    return commonApi.post<
      ResponseType<{ item: TaskType }>,
      AxiosResponse<ResponseType<{ item: TaskType }>>,
      { title: string }
    >(`/todo-lists/${todolistId}/tasks`, { title })
  },
  deleteTask(todolistId: string, taskId: string) {
    return commonApi.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return commonApi.put<
      ResponseType<{ item: TaskType }>,
      AxiosResponse<ResponseType<{ item: TaskType }>>,
      UpdateTaskModelType
    >(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
}





