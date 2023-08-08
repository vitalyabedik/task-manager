import React, { useCallback } from "react"

import styles from "features/todolists-list/todolists/ui/todolist/todolist.module.css"
import IconButton from "@mui/material/IconButton"
import Delete from "@mui/icons-material/Delete"
import Button from "@mui/material/Button"

import { AddItemForm } from "common/components/addItemForm"
import { EditableSpan } from "common/components/editableSpan"
import { Task } from "features/todolists-list/tasks/ui/task/task"
import {
  FilterValuesType,
  todolistsActions,
  todolistsThunks,
} from "features/todolists-list/todolists/model/todolists.reducer"
import { TaskDomainType, tasksThunks } from "features/todolists-list/tasks/model/tasks.reducer"
import { RequestStatusType } from "app/model/app.reducer"
import { TaskStatuses } from "common/enums"
import { useActions } from "common/hooks"

type PropsType = {
  id: string
  title: string
  tasks: Array<TaskDomainType>
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

export const Todolist: React.FC<PropsType> = React.memo(({ id, tasks, entityStatus, filter, title }) => {
  const { deleteTodolist, updateTodolistTitle, addTask } = useActions({ ...todolistsThunks, ...tasksThunks })
  const { changeTodolistFilter } = useActions(todolistsActions)

  const deleteTodolistCallback = useCallback(() => deleteTodolist({ todolistId: id }), [id])

  const changeTodolistTitleCallback = useCallback(
    (title: string) =>
      updateTodolistTitle({
        todolistId: id,
        title,
      }),
    [id, title],
  )

  const changeTodolistFilterAllCallback = useCallback(
    () =>
      changeTodolistFilter({
        todolistId: id,
        filter: "all",
      }),
    [id],
  )

  const changeTodolistFilterActiveCallback = useCallback(
    () =>
      changeTodolistFilter({
        todolistId: id,
        filter: "active",
      }),
    [id],
  )

  const changeTodolistFilterCompletedCallback = useCallback(
    () =>
      changeTodolistFilter({
        todolistId: id,
        filter: "completed",
      }),
    [id],
  )

  const addTaskHandler = useCallback((title: string) => addTask({ todolistId: id, title }), [])

  const onAllFilterBtnClasses = filter === "all" ? styles.activeFilter : ""
  const onActiveFilterBtnClasses = filter === "active" ? styles.activeFilter : ""
  const onCompletedFilterBtnClasses = filter === "completed" ? styles.activeFilter : ""

  let filteredTasks = tasks
  if (filter === "active") {
    filteredTasks = filteredTasks.filter((el) => el.status === TaskStatuses.New)
  }
  if (filter === "completed") {
    filteredTasks = filteredTasks.filter((el) => el.status === TaskStatuses.Completed)
  }

  return (
    <div>
      <h3>
        <EditableSpan disabled={entityStatus === "loading"} title={title} onChange={changeTodolistTitleCallback} />
        <IconButton disabled={entityStatus === "loading"} onClick={deleteTodolistCallback}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm disabled={entityStatus === "loading"} addItem={addTaskHandler} />
      <div>
        {filteredTasks.map((task) => {
          return <Task key={task.id} todolistId={id} task={task} />
        })}
      </div>
      <div>
        <Button
          variant={filter === "all" ? "contained" : "text"}
          className={onAllFilterBtnClasses}
          onClick={changeTodolistFilterAllCallback}
        >
          All
        </Button>
        <Button
          variant={filter === "active" ? "contained" : "text"}
          color={"primary"}
          className={onActiveFilterBtnClasses}
          onClick={changeTodolistFilterActiveCallback}
        >
          Active
        </Button>
        <Button
          variant={filter === "completed" ? "contained" : "text"}
          color={"secondary"}
          className={onCompletedFilterBtnClasses}
          onClick={changeTodolistFilterCompletedCallback}
        >
          Completed
        </Button>
      </div>
    </div>
  )
})
