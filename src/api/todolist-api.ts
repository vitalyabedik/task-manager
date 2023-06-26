import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true
})

export const todolistAPI = {
    getTodolist() {
        return instance.get<TodolistType[]>(`todo-lists`)
    },
    createTodolist(title: string) {
        return instance.post<TodolistResponseType<{ item: TodolistType }>>(`todo-lists`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<TodolistResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<TodolistResponseType>(`todo-lists/${todolistId}`, {title})
    },
    getTodolistTasks(todolistId: string) {
        return instance.get<TaskType[]>(`/todo-lists/${todolistId}/tasks`)
    },
    createTodolistTask(todolistId: string, title: string) {
        return instance.post<TaskResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTodolistTask(todolistId: string, taskId: string) {
        return instance.delete<TaskResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTodolistTask(todolistId: string, taskId: string, title: string) {
        return instance.put<TaskResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`, {title})
    },
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

type TaskResponseType<T = {}> = {
    items: T
    totalCount: number
    error: string
}

export type TodolistType = {
    id: string
    'title': string
    'addedDate': string
    'order': number
}

type TodolistResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: T
}


// ================ LATER ===========

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