import {TasksStateType} from '../App';
import {v1} from 'uuid';

import {
    AddTodolistACType,
    RemoveTodolistACType,
    SetTodolistsACType,
    todolistId1,
    todolistId2
} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from '../api/todolist-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from './store';

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
        case 'SET-TASKS': {
            return {
                ...state,
                [action.payload.todolistId]: action.payload.tasks
            }
        }
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.payload.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'REMOVE-TASK' : {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .filter(t => t.id !== action.payload.taskId)
            }
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
            }
        }
        case 'UPDATE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId
                        ? {...t, ...action.payload.model}
                        : t
                    )
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.payload.todolist.id]: []
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
    | updateTaskACType
    | AddTodolistACType
    | RemoveTodolistACType
    | SetTodolistsACType
    | SetTasksACType

// action creators
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
export const addTaskAC = (task: TaskType) => {
    return {
        type: 'ADD-TASK',
        payload: {
            task
        }
    } as const
}

type updateTaskACType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => {
    return {
        type: 'UPDATE-TASK',
        payload: {
            todolistId,
            taskId,
            model
        }
    } as const
}

type SetTasksACType = ReturnType<typeof setTasksAC>
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {
        type: 'SET-TASKS',
        payload: {
            todolistId,
            tasks
        }
    } as const
}

// thunk creators
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.getTodolistTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(todolistId, res.data.items))
        })
}

export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodolistTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTaskAC(todolistId, taskId))
        })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTodolistTask(todolistId, title)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find(t => t.id === taskId)

        if (task) {
            const apiModel: UpdateTaskModelType = {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status,
                ...domainModel
            }

            todolistAPI.updateTodolistTask(todolistId, taskId, apiModel)
                .then(() => {
                    dispatch(updateTaskAC(todolistId, taskId, domainModel ))
                })
        }
    }
}