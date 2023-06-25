import axios from 'axios';


const instance = axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true
})

export const todolistAPI = {
    getTodolist() {
        return instance.get<TodolistType[]>(`todo-lists`)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>(`todo-lists`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    },
}

type TodolistType = {
    id: string
    "title": string
    "addedDate": Date
    "order": number
}

type ResponseType<T = {}> = {
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
