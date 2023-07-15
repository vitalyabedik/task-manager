import {Dispatch} from 'redux'

import {SetAppErrorACType, setAppStatusAC, SetAppStatusACType} from '../../app/app-reducer'
import {authAPI, LoginParamsType} from '../../api/auth-api';
import {ResultCode} from '../../api/todolist-api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';

const initialState = {
    isLoggedIn: false,
    isInitialized: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case 'login/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}

// action creators
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

export const setIsInitializedAC = (value: boolean) =>
    ({type: 'login/SET-IS-INITIALIZED', value} as const)

// thunks creators
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))

    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === ResultCode.SUCCESS) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error.message)
        })
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        // debugger
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
        } else {
            handleServerAppError(dispatch, res.data)
        }
    })
        .catch((error) => {
            handleServerNetworkError(dispatch, error.message)
        })
        .finally(() => {
            dispatch(setIsInitializedAC(true))
        })
}

export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch,error)
        })
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setIsInitializedAC>
    | SetAppErrorACType
    | SetAppStatusACType
