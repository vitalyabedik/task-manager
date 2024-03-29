import React, { ChangeEvent, useEffect, useState } from "react"

import { todolistsApi } from "features/todolists-list/todolists/api/todolists.api"
import { tasksApi } from "features/todolists-list/tasks/api"

export default {
  title: "API",
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      setState(res.data)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [title, setTitle] = useState<any>(null)

  const onChangeTodolistTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const createTodolistHandler = () => {
    todolistsApi.addTodolist(title).then((res) => {
      setState(res.data)
    })
  }

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input onChange={onChangeTodolistTitleHandler} value={title} type="text" placeholder={"todolistTitle"} />
        <button onClick={createTodolistHandler}>create Todolist</button>
      </div>
    </div>
  )
}
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<any>(null)

  const onChangeTodolistIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(e.currentTarget.value)
  }

  const deleteTodolistHandler = () => {
    todolistsApi.deleteTodolist(todolistId).then((res) => {
      setState(res.data)
    })
  }

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input onChange={onChangeTodolistIdHandler} value={todolistId} type="text" placeholder={"todolistId"} />
        <button onClick={deleteTodolistHandler}>delete Todolist</button>
      </div>
    </div>
  )
}

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<any>(null)
  const [title, setTitle] = useState<any>(null)

  const onChangeTodolistIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(e.currentTarget.value)
  }

  const onChangeTodolistTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const updateTodolistHandler = () => {
    todolistsApi.updateTodolist({ todolistId, title }).then((res) => {
      setState(res.data)
    })
  }

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input onChange={onChangeTodolistIdHandler} value={todolistId} type="text" placeholder={"todolistId"} />
        <input onChange={onChangeTodolistTitleHandler} value={title} type="text" placeholder={"todolistTitle"} />
        <button onClick={updateTodolistHandler}>update Todolist Title</button>
      </div>
    </div>
  )
}

export const GetTodolistTasks = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<any>(null)

  const onChangeTodolistIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(e.currentTarget.value)
  }

  const getTaskHandler = () => {
    tasksApi.getTasks(todolistId).then((res) => {
      console.log(res.data)
      setState(res.data)
    })
  }

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input onChange={onChangeTodolistIdHandler} value={todolistId} type="text" placeholder={"todolistId"} />
        <button onClick={getTaskHandler}>get tasks</button>
      </div>
    </div>
  )
}

export const CreateTodolistTasks = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<any>(null)
  const [title, setTitle] = useState<any>(null)

  const onChangeTodolistIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(e.currentTarget.value)
  }

  const onChangeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const createTaskHandler = () => {
    tasksApi.addTask({ todolistId, title }).then((res) => {
      setState(res.data)
    })
  }

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input onChange={onChangeTodolistIdHandler} value={todolistId} type="text" placeholder={"todolistId"} />
        <input onChange={onChangeTaskTitleHandler} value={title} type="text" placeholder={"taskTitle"} />
        <button onClick={createTaskHandler}>create task</button>
      </div>
    </div>
  )
}

export const DeleteTodolistTask = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<any>(null)
  const [taskId, setTaskId] = useState<any>(null)

  const onChangeTodolistIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(e.currentTarget.value)
  }

  const onChangeTaskIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskId(e.currentTarget.value)
  }

  const deleteTaskHandler = () => {
    tasksApi.deleteTask({ todolistId, taskId }).then((res) => {
      setState(res.data)
    })
  }

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input onChange={onChangeTodolistIdHandler} value={todolistId} type="text" placeholder={"todolistId"} />
        <input onChange={onChangeTaskIdHandler} value={taskId} type="text" placeholder={"taskId"} />
        <button onClick={deleteTaskHandler}>delete task</button>
      </div>
    </div>
  )
}

export const UpdateTodolistTask = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<any>(null)
  const [taskId, setTaskId] = useState<any>(null)
  const [title, setTitle] = useState<any>(null)

  const onChangeTodolistIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(e.currentTarget.value)
  }

  const onChangeTaskIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskId(e.currentTarget.value)
  }

  const onChangeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const updateTaskHandler = () => {
    tasksApi.updateTask(todolistId, taskId, title).then((res) => {
      setState(res.data)
    })
  }

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input onChange={onChangeTodolistIdHandler} value={todolistId} type="text" placeholder={"todolistId"} />
        <input onChange={onChangeTaskIdHandler} value={taskId} type="text" placeholder={"taskId"} />
        <input onChange={onChangeTaskTitleHandler} value={title} type="text" placeholder={"taskTitle"} />
        <button onClick={updateTaskHandler}>update task title</button>
      </div>
    </div>
  )
}
