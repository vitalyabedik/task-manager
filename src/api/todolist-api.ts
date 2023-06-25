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

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: Date
}

type TaskResponseType<T = {}> = {
    items: T
    totalCount: number
    error: string
}

type TodolistType = {
    id: string
    'title': string
    'addedDate': Date
    'order': number
}

type TodolistResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: T
}

// type CreateTodolistResponseType = {
//     resultCode: number
//     messages: string[]
//     fieldsErrors: string[]
//     data: {
//         item: TodolistType
//     }
// }
//
// type DeleteTodolistResponseType = {
//     resultCode: number
//     messages: string[]
//     fieldsErrors: string[]
//     data: {}
// }
//
// type UpdateTodolistResponseType = {
//     resultCode: number
//     messages: string[]
//     fieldsErrors: string[]
//     data: {}
// }
