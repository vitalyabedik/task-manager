import {Dispatch} from 'redux';
import {AxiosError} from 'axios';

import {RootStateType} from '../../../app/store';
import {
    ErrorType, ResultCode,
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistAPI,
    UpdateTaskModelType
} from '../../../api/todolist-api';
import {
    AddTodolistACType, ClearTodolistsDataACType,
    RemoveTodolistACType,
    SetTodolistsACType,
} from '../todolists-reducer';
import {TasksStateType} from '../../../app/App';
import {RequestStatusType, setAppStatusAC} from '../../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../../utils/error-utils';

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'SET-TASKS':
            return {
                ...state,
                [action.todolistId]: action.tasks
                    .map(task => ({...task, entityStatus: 'idle'}))
            }
        case 'SET-TODOLISTS':
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        case 'REMOVE-TASK' :
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.task.todoListId]:
                    [
                        {...action.task, entityStatus: 'idle'},
                        ...state[action.task.todoListId]
                    ]
            }
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'CHANGE-TASK-ENTITY-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, entityStatus: action.status} : t)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolist.id]: []
            }
        case 'REMOVE-TODOLIST':
            const stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        case 'CLEAR-TODOLISTS-DATA':
            return {}
        default:
            return state
    }
}

// action creators
export const removeTaskAC = (todolistId: string, taskId: string) => ({type: 'REMOVE-TASK', todolistId, taskId} as const)

export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)

export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => ({
    type: 'UPDATE-TASK',
    todolistId,
    taskId,
    model
} as const)

export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({type: 'SET-TASKS', todolistId, tasks} as const)

export const changeTaskEntityStatusAC = (todolistId: string, taskId: string, status: RequestStatusType) => ({
    type: 'CHANGE-TASK-ENTITY-STATUS',
    todolistId,
    taskId,
    status
} as const)

// thunk creators
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTodolistTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(todolistId, res.data.items))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e: AxiosError<ErrorType>) => {
            const error = e.response ? e.response?.data.messages[0].message : e.message
            handleServerNetworkError(dispatch, error)
        })
}

export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTaskEntityStatusAC(todolistId, taskId,'loading'))
    todolistAPI.deleteTodolistTask(todolistId, taskId)
        .then(res => {
            if (res.data.resultCode === ResultCode.SUCCESS) {
                dispatch(removeTaskAC(todolistId, taskId))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((e: AxiosError<ErrorType>) => {
            const error = e.response ? e.response?.data.messages[0].message : e.message
            handleServerNetworkError(dispatch, error)
        })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTodolistTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === ResultCode.SUCCESS) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError<{ item: TaskType }>(dispatch, res.data)
            }
        })
        .catch((e: AxiosError<ErrorType>) => {
            const error = e.response ? e.response?.data.messages[0].message : e.message
            handleServerNetworkError(dispatch, error)
        })
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: Dispatch, getState: () => RootStateType) => {
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

            dispatch(setAppStatusAC('loading'))
            dispatch(changeTaskEntityStatusAC(todolistId, taskId,'loading'))
            todolistAPI.updateTodolistTask(todolistId, taskId, apiModel)
                .then((res) => {
                    if (res.data.resultCode === ResultCode.SUCCESS) {
                        dispatch(updateTaskAC(todolistId, taskId, domainModel))
                        dispatch(setAppStatusAC('succeeded'))
                        dispatch(changeTaskEntityStatusAC(todolistId, taskId,'succeeded'))
                    } else {
                        handleServerAppError(dispatch, res.data)
                    }
                })
                .catch((e: AxiosError<ErrorType>) => {
                    const error = e.response ? e.response?.data.messages[0].message : e.message
                    handleServerNetworkError(dispatch, error)
                })
        }
    }
}

// types
export type TasksActionsType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof changeTaskEntityStatusAC>
    | AddTodolistACType
    | RemoveTodolistACType
    | SetTodolistsACType
    | ClearTodolistsDataACType

export type TaskDomainType = TaskType & {
    entityStatus: RequestStatusType
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
