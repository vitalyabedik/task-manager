import React from "react"

import { Task } from "features/todolists-list/todolists/ui/todolist/tasks/task"
import { TaskStatuses } from "common/enums"
import { TodolistDomainType } from "features/todolists-list/todolists/model/todolists.slice"
import { TaskDomainType } from "features/todolists-list/tasks/model/tasks.slice"

type PropsType = {
  todolist: TodolistDomainType
  tasks: Array<TaskDomainType>
}

export const Tasks: React.FC<PropsType> = ({ todolist, tasks }) => {
  let filteredTasks = tasks

  if (todolist.filter === "active") {
    filteredTasks = filteredTasks.filter((el) => el.status === TaskStatuses.New)
  }

  if (todolist.filter === "completed") {
    filteredTasks = filteredTasks.filter((el) => el.status === TaskStatuses.Completed)
  }

  return (
    <>
      {filteredTasks.map((task) => {
        return <Task key={task.id} todolistId={todolist.id} task={task} />
      })}
    </>
  )
}
