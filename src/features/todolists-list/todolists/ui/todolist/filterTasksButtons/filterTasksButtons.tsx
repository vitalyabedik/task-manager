import React from "react"

import Button from "@mui/material/Button"
import { useActions } from "common/hooks"
import {
  FilterValuesType,
  TodolistDomainType,
  todolistsActions,
} from "features/todolists-list/todolists/model/todolists.reducer"
import styles from "features/todolists-list/todolists/ui/todolist/todolist.module.css"

type PropsType = {
  todolist: TodolistDomainType
}

export const FilterTasksButtons: React.FC<PropsType> = ({ todolist }) => {
  const { changeTodolistFilter } = useActions(todolistsActions)

  const changeTodolistFilterCallback = (filter: FilterValuesType) =>
    changeTodolistFilter({
      todolistId: todolist.id,
      filter,
    })

  const onAllFilterBtnClasses = todolist.filter === "all" ? styles.activeFilter : ""
  const onActiveFilterBtnClasses = todolist.filter === "active" ? styles.activeFilter : ""
  const onCompletedFilterBtnClasses = todolist.filter === "completed" ? styles.activeFilter : ""

  return (
    <>
      <Button
        className={onAllFilterBtnClasses}
        variant={todolist.filter === "all" ? "contained" : "text"}
        onClick={() => changeTodolistFilterCallback("all")}
      >
        All
      </Button>
      <Button
        className={onActiveFilterBtnClasses}
        variant={todolist.filter === "active" ? "contained" : "text"}
        color={"primary"}
        onClick={() => changeTodolistFilterCallback("active")}
      >
        Active
      </Button>
      <Button
        className={onCompletedFilterBtnClasses}
        variant={todolist.filter === "completed" ? "contained" : "text"}
        color={"secondary"}
        onClick={() => changeTodolistFilterCallback("completed")}
      >
        Completed
      </Button>
    </>
  )
}
