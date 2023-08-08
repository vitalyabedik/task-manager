import React, { useCallback } from "react"

import styles from "features/todolists-list/todolists/ui/todolist/Todolist.module.css"
import IconButton from "@mui/material/IconButton"
import Delete from "@mui/icons-material/Delete"
import Button from "@mui/material/Button"

import { AddItemForm } from "common/components/AddItemForm"
import { EditableSpan } from "common/components/EditableSpan"
import { Task } from "features/todolists-list/tasks/ui/task/Task"
import { FilterValuesType } from "features/todolists-list/todolists/model/todolists.reducer"
import { TaskDomainType } from "features/todolists-list/tasks/model/tasks.reducer"
import { RequestStatusType } from "app/app.reducer"
import { TaskStatuses } from "common/enums"

type PropsType = {
  id: string
  title: string
  tasks: Array<TaskDomainType>
  filter: FilterValuesType
  entityStatus: RequestStatusType
  removeTodolist: (todolistId: string) => void
  changeTodolistTitle: (todolistId: string, title: string) => void
  changeFilter: (todolistId: string, value: FilterValuesType) => void
  addTask: (todolistId: string, title: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
  const removeTodolistHandler = useCallback(() => {
    props.removeTodolist(props.id)
  }, [props.removeTodolist, props.id])

  const changeTodolistTitleHandler = useCallback(
    (newTitle: string) => {
      props.changeTodolistTitle(props.id, newTitle)
    },
    [props.changeTodolistTitle, props.id],
  )

  const onClickAllHandler = useCallback(() => {
    props.changeFilter(props.id, "all")
  }, [props.changeFilter, props.id])

  const onClickActiveHandler = useCallback(() => {
    props.changeFilter(props.id, "active")
  }, [props.changeFilter, props.id])

  const onClickCompletedHandler = useCallback(() => {
    props.changeFilter(props.id, "completed")
  }, [props.changeFilter, props.id])

  const addTask = useCallback(
    (title: string) => {
      props.addTask(props.id, title)
    },
    [props.addTask, props.id],
  )

  const onAllFilterBtnClasses = props.filter === "all" ? styles.activeFilter : ""
  const onActiveFilterBtnClasses = props.filter === "active" ? styles.activeFilter : ""
  const onCompletedFilterBtnClasses = props.filter === "completed" ? styles.activeFilter : ""

  let filteredTasks = props.tasks
  if (props.filter === "active") {
    filteredTasks = filteredTasks.filter((el) => el.status === TaskStatuses.New)
  }
  if (props.filter === "completed") {
    filteredTasks = filteredTasks.filter((el) => el.status === TaskStatuses.Completed)
  }

  return (
    <div>
      <h3>
        <EditableSpan
          disabled={props.entityStatus === "loading"}
          title={props.title}
          onChange={changeTodolistTitleHandler}
        />
        <IconButton disabled={props.entityStatus === "loading"} onClick={removeTodolistHandler}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm disabled={props.entityStatus === "loading"} addItem={addTask} />
      <div>
        {filteredTasks.map((task) => {
          return <Task key={task.id} todolistId={props.id} task={task} />
        })}
      </div>
      <div>
        <Button
          variant={props.filter === "all" ? "contained" : "text"}
          className={onAllFilterBtnClasses}
          onClick={onClickAllHandler}
        >
          All
        </Button>
        <Button
          variant={props.filter === "active" ? "contained" : "text"}
          color={"primary"}
          className={onActiveFilterBtnClasses}
          onClick={onClickActiveHandler}
        >
          Active
        </Button>
        <Button
          variant={props.filter === "completed" ? "contained" : "text"}
          color={"secondary"}
          className={onCompletedFilterBtnClasses}
          onClick={onClickCompletedHandler}
        >
          Completed
        </Button>
      </div>
    </div>
  )
})
