import {TasksStateType} from '../App';
import {v1} from 'uuid';

import {AddTodolistACType, RemoveTodolistACType, todolistId1, todolistId2} from './todolists-reducer';
import {TaskPriorities, TaskStatuses} from '../api/todolist-api';

const initialState: TasksStateType = {
    [todolistId1]: [
        {
            id: v1(), title: 'CSS&HTML', status: TaskStatuses.Completed, priority: TaskPriorities.Low,
            startDate: '', deadline: '', todoListId: todolistId1, order: 0, addedDate: '', description: ''
        }
    ],
    [todolistId2]: [
        {
            id: v1(), title: 'CSS&HTML', status: TaskStatuses.Completed, priority: TaskPriorities.Low,
            startDate: '', deadline: '', todoListId: todolistId2, order: 0, addedDate: '', description: ''
        }
    ],
}

export const tasksReducer = (state = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK' : {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .filter(t => t.id !== action.payload.taskId)
            }
        }
        case 'ADD-TASK': {
            const newTask = {
                id: v1(),
                title: action.payload.title,
                status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                startDate: '', deadline: '', todoListId: todolistId2, order: 0, addedDate: '', description: ''
            }
            return {
                ...state,
                [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId
                        ? {...t, status: action.payload.status}
                        : t
                    )
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId
                        ? {...t, title: action.payload.title}
                        : t
                    )
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.payload.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.payload.todolistId]
            return stateCopy
        }

        default:
            return state
    }
}


export type TasksActionsType = RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTodolistACType
    | RemoveTodolistACType

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistId,
            taskId
        }
    } as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistId,
            title
        }
    } as const
}

type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todolistId,
            taskId,
            status
        }
    } as const
}

type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todolistId,
            taskId,
            title
        }
    } as const
}

