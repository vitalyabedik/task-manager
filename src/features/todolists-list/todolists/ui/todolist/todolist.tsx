import React, { useCallback } from "react"

import IconButton from "@mui/material/IconButton"
import Delete from "@mui/icons-material/Delete"

import { AddItemForm } from "common/components/addItemForm"
import { EditableSpan } from "common/components/editableSpan"
import { Task } from "features/todolists-list/tasks/ui/task/task"
import { TodolistDomainType, todolistsThunks } from "features/todolists-list/todolists/model/todolists.reducer"
import { TaskDomainType, tasksThunks } from "features/todolists-list/tasks/model/tasks.reducer"
import { TaskStatuses } from "common/enums"
import { useActions } from "common/hooks"
import { FilterTasksButtons } from "features/todolists-list/todolists/ui/todolist/filterTasksButtons/filterTasksButtons"

type PropsType = {
  todolist: TodolistDomainType
  tasks: Array<TaskDomainType>
}

export const Todolist: React.FC<PropsType> = React.memo(({ todolist, tasks }) => {
  const { deleteTodolist, updateTodolistTitle, addTask } = useActions({ ...todolistsThunks, ...tasksThunks })

  const deleteTodolistCallback = useCallback(() => deleteTodolist({ todolistId: todolist.id }), [todolist.id])

  const changeTodolistTitleCallback = useCallback(
    (title: string) =>
      updateTodolistTitle({
        todolistId: todolist.id,
        title,
      }),
    [todolist.id, todolist.title],
  )

  const addTaskHandler = useCallback((title: string) => addTask({ todolistId: todolist.id, title }), [])

  let filteredTasks = tasks
  if (todolist.filter === "active") {
    filteredTasks = filteredTasks.filter((el) => el.status === TaskStatuses.New)
  }
  if (todolist.filter === "completed") {
    filteredTasks = filteredTasks.filter((el) => el.status === TaskStatuses.Completed)
  }

  return (
    <div>
      <h3>
        <EditableSpan
          disabled={todolist.entityStatus === "loading"}
          title={todolist.title}
          onChange={changeTodolistTitleCallback}
        />
        <IconButton disabled={todolist.entityStatus === "loading"} onClick={deleteTodolistCallback}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm disabled={todolist.entityStatus === "loading"} addItem={addTaskHandler} />
      <div>
        {filteredTasks.map((task) => {
          return <Task key={task.id} todolistId={todolist.id} task={task} />
        })}
      </div>
      <div>
        <FilterTasksButtons todolist={todolist} />
      </div>
    </div>
  )
})
