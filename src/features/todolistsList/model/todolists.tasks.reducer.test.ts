import {
  RemoveTodolistArgType,
  TodolistDomainType,
  todolistsActions,
  todolistsSlice,
  todolistsThunks,
} from "features/todolistsList/model/todolists.slice"
import { tasksSlice } from "features/tasks/model/tasks.slice"
import { TasksStateType } from "app"
import { TaskPriorities, TaskStatuses } from "common/enums"
import { TodolistType } from "features/todolistsList/api"

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: TodolistDomainType[] = []

  let todolist: TodolistType = {
    id: "any id",
    title: "newTodolistTitle",
    addedDate: "",
    order: 0,
  }

  const action = todolistsActions.addTodolist({ todolist })

  const endTasksState = tasksSlice(startTasksState, action)
  const endTodolistsState = todolistsSlice(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})

test("property with todolistId should be deleted", () => {
  const startState: TasksStateType = {
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        entityStatus: "idle",
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
        description: "",
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Low,
        entityStatus: "idle",
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
        description: "",
      },
      {
        id: "3",
        title: "React",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        entityStatus: "idle",
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
        description: "",
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        entityStatus: "idle",
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "",
        description: "",
      },
      {
        id: "2",
        title: "milk",
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Low,
        entityStatus: "idle",
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "",
        description: "",
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        entityStatus: "idle",
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "",
        description: "",
      },
    ],
  }

  type RemoveActionType = {
    type: typeof todolistsThunks.removeTodolist.fulfilled.type
    payload: RemoveTodolistArgType
  }

  const action: RemoveActionType = {
    type: todolistsThunks.removeTodolist.fulfilled.type,
    payload: {
      todolistId: "todolistId2",
    },
  }

  const endState = tasksSlice(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState["todolistId2"]).not.toBeDefined()
})
