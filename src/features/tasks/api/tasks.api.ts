import { AxiosResponse } from "axios"

import { commonApi } from "common/api/common.api"
import { ResponseType } from "common/api/common.types.api"
import {
  AddTaskArgType,
  DeleteTaskArgType,
  GetTasksArgType,
  GetTasksResponse,
  TaskType,
  UpdateTaskModelType,
} from "features/tasks/api/tasks.types.api"

export const tasksApi = {
  getTasks(arg: GetTasksArgType) {
    return commonApi.get<GetTasksResponse>(`/todo-lists/${arg.todolistId}/tasks`)
  },
  addTask(arg: AddTaskArgType) {
    return commonApi.post<
      ResponseType<{ item: TaskType }>,
      AxiosResponse<ResponseType<{ item: TaskType }>>,
      { title: string }
    >(`/todo-lists/${arg.todolistId}/tasks`, { title: arg.title })
  },
  deleteTask(arg: DeleteTaskArgType) {
    return commonApi.delete<ResponseType>(`/todo-lists/${arg.todolistId}/tasks/${arg.taskId}`)
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return commonApi.put<
      ResponseType<{ item: TaskType }>,
      AxiosResponse<ResponseType<{ item: TaskType }>>,
      UpdateTaskModelType
    >(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
}
