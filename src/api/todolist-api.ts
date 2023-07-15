import {instance} from './instance';
import {AxiosResponse} from 'axios';

// todolist api
export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>(`todo-lists`)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>, AxiosResponse<ResponseType<{ item: TodolistType }>>, { title: string }>(`todo-lists`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType, AxiosResponse<ResponseType>, { title: string }>(`todo-lists/${todolistId}`, {title})
    },
    getTodolistTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
    },
    createTodolistTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>, AxiosResponse<ResponseType<{ item: TaskType }>>, { title: string }>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTodolistTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTodolistTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<{ item: TaskType }>, AxiosResponse<ResponseType<{ item: TaskType }>>, UpdateTaskModelType>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
}

// types
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}
type GetTasksResponse = {
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

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}

export enum ResultCode {
    SUCCESS = 0,
    ERROR = 1,
    CAPTCHA_ERROR = 10
}

export type ErrorType = {
    statusCode: number
    messages: [
        {
            message: string
            field: string
        }
    ],
    error: string
}