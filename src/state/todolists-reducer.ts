import {v1} from 'uuid';

import {TodolistType} from '../api/todolist-api';

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export let todolistId1 = v1()
export let todolistId2 = v1()

const initialState: TodolistDomainType[] = [
    {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0},
]

export const todolistsReducer = (state = initialState, action: TodolistsActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' : {
            return state.filter(t => t.id !== action.payload.todolistId)
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistDomainType = {
                id: action.payload.todolistId,
                title: action.payload.newTitle,
                filter: 'all',
                addedDate: '',
                order: 0
            }
            return [...state, newTodolist]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(t => t.id === action.payload.todolistId ? {...t, title: action.payload.newTitle} : t)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(t => t.id === action.payload.todolistId ? {...t, filter: action.payload.newFilter} : t)
        }

        default:
            return state
    }
}


export type TodolistsActionsType =
    RemoveTodolistACType
    | AddTodolistACType
    | ChangeTodolistTitleAC
    | ChangeTodolistFilterACType

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId
        }
    } as const
}

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            todolistId: v1(),
            newTitle
        }
    } as const
}

type ChangeTodolistTitleAC = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistId: string, newTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistId,
            newTitle
        }
    } as const
}

type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (todolistId: string, newFilter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistId,
            newFilter
        }
    } as const
}