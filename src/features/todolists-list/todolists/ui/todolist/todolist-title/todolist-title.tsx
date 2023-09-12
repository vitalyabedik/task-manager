import React, { useCallback } from "react"

import { EditableSpan } from "common/components"
import IconButton from "@mui/material/IconButton"
import Delete from "@mui/icons-material/Delete"
import { TodolistDomainType, todolistsThunks } from "features/todolists-list/todolists/model/todolists.slice"
import { useActions } from "common/hooks"

type Props = {
  todolist: TodolistDomainType
}

export const TodolistTitle = ({ todolist }: Props): JSX.Element => {
  const { deleteTodolist, updateTodolistTitle } = useActions(todolistsThunks)

  const deleteTodolistCallback = useCallback(() => deleteTodolist({ todolistId: todolist.id }), [todolist.id])

  const changeTodolistTitleCallback = useCallback(
    (title: string) =>
      updateTodolistTitle({
        todolistId: todolist.id,
        title,
      }),
    [todolist.id, todolist.title],
  )

  return (
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
  )
}
