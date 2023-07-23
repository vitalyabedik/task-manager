import { createAction, nanoid } from "@reduxjs/toolkit"
import { TasksStateType } from "app"
import { TodolistDomainType } from "features/TodolistsList/todolists-reducer"

// export type ClearTasksAndTodolistsType = {
//     tasks: TasksStateType,
//     todolists: TodolistDomainType[]
// }

export const clearTasksAndTodolists = createAction("common/clear-todolists-tasks")

// export const clearTasksAndTodolists = createAction<ClearTasksAndTodolistsType>('common/clear-todolists-tasks')

// edu example 1
// export const clearTasksAndTodolists = createAction('common/clear-todolists-tasks',
//     (todolists: TodolistDomainType[], tasks: TasksStateType) => {
//     //second parameter is callback
//         let random = 100
//
//         // do any logic
//         return {
//             payload: {
//                 todolists,
//                 tasks,
//                 id: random > 90 ? nanoid() : Math.random()
//             }
//         }
//     }
// )
