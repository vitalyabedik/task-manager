import { TaskPriorities, TaskStatuses } from "common/enums"
import { UpdateDomainTaskModelType } from "features/todolists-list/tasks/model/tasks.slice"

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

export type GetTasksArgType = {
  todolistId: string
}

export type AddTaskArgType = {
  todolistId: string
  title: string
}

export type DeleteTaskArgType = {
  todolistId: string
  taskId: string
}

export type UpdateTaskArgType = {
  todolistId: string
  taskId: string
  domainModel: UpdateDomainTaskModelType
}
