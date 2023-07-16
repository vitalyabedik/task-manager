import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';

import {tasksReducer} from '../features/TodolistsList/Task/tasks-reducer'
import {todolistsReducer} from '../features/TodolistsList/todolists-reducer'
import {appReducer} from './app-reducer';
import {authReducer} from '../features/Login/auth-reducer';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type RootReducerType = ReturnType<typeof rootReducer>
export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootStateType, unknown,AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootStateType,
    unknown,
    AnyAction
>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store



