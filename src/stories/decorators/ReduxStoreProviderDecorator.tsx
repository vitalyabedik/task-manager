import React from 'react'
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import thunkMiddleware from 'redux-thunk'
import {v1} from 'uuid';

import {AppRootStateType} from '../../app/store';
import {tasksReducer} from '../../features/TodolistsList/Task/tasks-reducer';
import {todolistsReducer} from '../../features/TodolistsList/todolists-reducer';
import {TaskPriorities, TaskStatuses} from '../../api/todolist-api';
import {appReducer} from '../../app/app-reducer';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'}
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(), title: 'HTML&CSS', status: TaskStatuses.New, priority: TaskPriorities.Low, entityStatus: 'idle',
                startDate: '', deadline: '', todoListId: 'todolistId1', order: 0, addedDate: '', description: ''
            },
            {
                id: v1(), title: 'JS', status: TaskStatuses.Completed, priority: TaskPriorities.Low, entityStatus: 'idle',
                startDate: '', deadline: '', todoListId: 'todolistId1', order: 0, addedDate: '', description: ''
            }
        ],
        ['todolistId2']: [
            {
                id: v1(), title: 'Milk', status: TaskStatuses.New, priority: TaskPriorities.Low, entityStatus: 'idle',
                startDate: '', deadline: '', todoListId: 'todolistId2', order: 0, addedDate: '', description: ''
            },
            {
                id: v1(), title: 'React Book', status: TaskStatuses.Completed, priority: TaskPriorities.Low, entityStatus: 'idle',
                startDate: '', deadline: '', todoListId: 'todolistId2', order: 0, addedDate: '', description: ''
            }
        ]
    },
    app: {
        status: 'idle',
        error: null
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState, applyMiddleware(thunkMiddleware));


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
