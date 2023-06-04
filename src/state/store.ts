import {combineReducers, legacy_createStore} from 'redux'

import { tasksReducer } from './tasks-reducer'
import { todolistsReducer } from './todolists-reducer'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export const store = legacy_createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
