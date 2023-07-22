import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {authAPI, LoginParamsType} from 'api/auth-api';
import {ResultCode} from 'api/todolist-api';
import {handleServerAppError, handleServerNetworkError} from 'utils/error-utils';
import {AppThunk} from 'app/store';
import {appActions} from 'app/app-reducer';
import {clearTasksAndTodolists} from 'common/actions/common.actions';

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            state.isLoggedIn = action.payload.isLoggedIn
            // return {...state, isLoggedIn: action.value}
        }
    }
})

export const authReducer = slice.reducer
export const authActions = slice.actions

// thunks creators
export const loginTC = (data: LoginParamsType): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))

    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === ResultCode.SUCCESS) {
                dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error.message)
        })
}

export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))

    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(authActions.setIsLoggedIn({isLoggedIn: false}))
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
                dispatch(clearTasksAndTodolists())

                // edu example 0
                // dispatch(clearTasksAndTodolists({todolists: [], tasks: {}}))

                // edu example 1
                // dispatch(clearTasksAndTodolists([], {}))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error)
        })
}


