import { v1 } from "uuid"

import {
  FilterValuesType,
  TodolistDomainType,
  todolistsActions,
  todolistsSlice,
} from "features/todolistsList/model/todolists.slice"

let todolistId1: string
let todolistId2: string
let startState: TodolistDomainType[]

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()

  startState = [
    { id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0, entityStatus: "idle" },
    { id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0, entityStatus: "idle" },
  ]
})

test("correct todolist should be removed", () => {
  const endState = todolistsSlice(startState, todolistsActions.removeTodolist({ todolistId: todolistId1 }))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", () => {
  let newTodolistTitle = "newTodolistTitle"

  const endState = todolistsSlice(
    startState,
    todolistsActions.addTodolist({
      todolist: {
        id: "any id",
        title: newTodolistTitle,
        addedDate: "",
        order: 0,
      },
    }),
  )

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(newTodolistTitle)
})

test("correct todolist should changed title", () => {
  let newTodolistTitle = "newTodolistTitle"

  const endState = todolistsSlice(
    startState,
    todolistsActions.changeTodolistTitle({
      todolistId: todolistId2,
      title: newTodolistTitle,
    }),
  )

  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe(newTodolistTitle)
})

test("correct filter should be changed", () => {
  let newFilter: FilterValuesType = "completed"

  const endState = todolistsSlice(
    startState,
    todolistsActions.changeTodolistFilter({
      todolistId: todolistId2,
      filter: newFilter,
    }),
  )

  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe(newFilter)
})
