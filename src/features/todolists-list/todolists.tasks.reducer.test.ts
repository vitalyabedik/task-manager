import {
  TodolistDomainType,
  todolistsReducer,
  todolistsThunks,
} from "features/todolists-list/todolists/model/todolists.reducer"
import { tasksReducer, TasksStateType } from "features/todolists-list/tasks/model/tasks.reducer"
import { TaskPriorities, TaskStatuses } from "common/enums"
import { DeleteTodolistArgType, TodolistType } from "features/todolists-list/todolists/api"

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: TodolistDomainType[] = []

  let todolist: TodolistType = {
    id: "any id",
    title: "newTodolistTitle",
    addedDate: "",
    order: 0,
  }

  type AddActionType = {
    type: typeof todolistsThunks.addTodolist.fulfilled.type
    payload: {
      todolist: TodolistType
    }
  }

  const action: AddActionType = {
    type: todolistsThunks.addTodolist.fulfilled.type,
    payload: {
      todolist,
    },
  }

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

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

  type DeleteActionType = {
    type: typeof todolistsThunks.deleteTodolist.fulfilled.type
    payload: DeleteTodolistArgType
  }

  const action: DeleteActionType = {
    type: todolistsThunks.deleteTodolist.fulfilled.type,
    payload: {
      todolistId: "todolistId2",
    },
  }

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState["todolistId2"]).not.toBeDefined()
})
