import { tasksSlice, tasksThunks } from "features/tasks/model/tasks.slice"
import { todolistsThunks } from "features/todolistsList/model/todolists.slice"
import { TasksStateType } from "app"
import { TaskPriorities, TaskStatuses } from "common/enums"
import { DeleteTaskArgType, TaskType, UpdateTaskArgType } from "features/tasks/api"
import { TodolistType } from "features/todolistsList/api"

let startState: TasksStateType

type UpdateTaskActionType = {
  type: typeof tasksThunks.updateTask.fulfilled.type
  payload: UpdateTaskArgType
}

beforeEach(() => {
  startState = {
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
})

test("correct task should be deleted from correct array", () => {
  type RemoveActionType = {
    type: typeof tasksThunks.deleteTask.fulfilled.type
    payload: DeleteTaskArgType
  }

  const action: RemoveActionType = {
    type: tasksThunks.deleteTask.fulfilled.type,
    payload: {
      todolistId: "todolistId2",
      taskId: "2",
    },
  }

  const endState = tasksSlice(startState, action)

  expect(endState).toEqual({
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
  })

  expect(endState["todolistId1"].length).toBe(3)
  expect(endState["todolistId2"].length).toBe(2)
  expect(endState["todolistId2"].every((t) => t.id !== "2")).toBeTruthy()
})

test("correct task should be added to correct array", () => {
  const task = {
    id: "1",
    title: "juce",
    status: TaskStatuses.New,
    priority: TaskPriorities.Low,
    startDate: "",
    deadline: "",
    todoListId: "todolistId2",
    order: 0,
    addedDate: "",
    description: "",
  }

  type AddActionType = {
    type: typeof tasksThunks.addTask.fulfilled.type
    payload: { task: TaskType }
  }

  const action: AddActionType = {
    type: tasksThunks.addTask.fulfilled.type,
    payload: { task },
  }

  const endState = tasksSlice(startState, action)

  expect(endState["todolistId1"].length).toBe(3)
  expect(endState["todolistId2"].length).toBe(4)
  expect(endState["todolistId2"][0].id).toBeDefined()
  expect(endState["todolistId2"][0].title).toBe("juce")
  expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New)
})

test("status of specified task should be changed", () => {
  const action: UpdateTaskActionType = {
    type: tasksThunks.updateTask.fulfilled.type,
    payload: {
      todolistId: "todolistId2",
      taskId: "2",
      domainModel: {
        status: TaskStatuses.New,
      },
    },
  }

  const endState = tasksSlice(startState, action)

  expect(endState["todolistId2"][2].status).toBe(TaskStatuses.New)
  expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed)
})

test("title of specified task should be changed", () => {
  const action: UpdateTaskActionType = {
    type: tasksThunks.updateTask.fulfilled.type,
    payload: {
      todolistId: "todolistId2",
      taskId: "2",
      domainModel: {
        title: "water",
      },
    },
  }

  const endState = tasksSlice(startState, action)

  expect(endState["todolistId2"][1].title).toBe("water")
  expect(endState["todolistId1"][1].title).toBe("JS")
})

test("new array should be added when new todolist is added", () => {
  const todolist = {
    id: "any id",
    title: "new todolist",
    addedDate: "",
    order: 0,
  }

  type ActionType = {
    type: typeof todolistsThunks.addTodolist.fulfilled.type
    payload: {
      todolist: TodolistType
    }
  }

  const action: ActionType = {
    type: todolistsThunks.addTodolist.fulfilled.type,
    payload: {
      todolist,
    },
  }

  const endState = tasksSlice(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k != "todolistId1" && k != "todolistId2")
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})
