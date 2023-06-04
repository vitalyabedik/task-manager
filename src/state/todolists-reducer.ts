import {FilterType, TodolistType} from '../App';
import {v1} from 'uuid';


export let todolistId1 = v1()
export let todolistId2 = v1()

const initialState: TodolistType[] = [
    {id: todolistId1, title: 'What to learn', filter: 'active'},
    {id: todolistId2, title: 'What to buy', filter: 'completed'},
]

export const todolistsReducer = (state = initialState, action: TodolistsActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' : {
            return state.filter(t => t.id !== action.payload.todolistId)
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistType = {
                id: action.payload.todolistId,
                title: action.payload.newTitle,
                filter: 'all'
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
export const changeTodolistFilterAC = (todolistId: string, newFilter: FilterType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistId,
            newFilter
        }
    } as const
}