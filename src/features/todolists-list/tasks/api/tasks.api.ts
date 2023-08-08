import { AxiosResponse } from "axios"

import { commonApi } from "common/api/common.api"
import { BaseResponseType } from "common/api/common.api.types"
import {
  AddTaskArgType,
  DeleteTaskArgType,
  GetTasksArgType,
  GetTasksResponse,
  TaskType,
  UpdateTaskModelType,
} from "features/todolists-list/tasks/api/tasks.api.types"

export const tasksApi = {
  getTasks(arg: GetTasksArgType) {
    return commonApi.get<GetTasksResponse>(`/todo-lists/${arg.todolistId}/tasks`)
  },
  addTask(arg: AddTaskArgType) {
    return commonApi.post<
      BaseResponseType<{ item: TaskType }>,
      AxiosResponse<BaseResponseType<{ item: TaskType }>>,
      { title: string }
    >(`/todo-lists/${arg.todolistId}/tasks`, { title: arg.title })
  },
  deleteTask(arg: DeleteTaskArgType) {
    return commonApi.delete<BaseResponseType>(`/todo-lists/${arg.todolistId}/tasks/${arg.taskId}`)
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return commonApi.put<
      BaseResponseType<{ item: TaskType }>,
      AxiosResponse<BaseResponseType<{ item: TaskType }>>,
      UpdateTaskModelType
    >(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
}
