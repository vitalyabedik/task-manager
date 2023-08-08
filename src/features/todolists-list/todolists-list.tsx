import React, { useCallback, useEffect } from "react"
import { Navigate } from "react-router-dom"

import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"

import { todolistsActions, todolistsThunks } from "features/todolists-list/todolists/model/todolists.reducer"
import { tasksThunks } from "features/todolists-list/tasks/model/tasks.reducer"
import { AddItemForm } from "common/components/add-item-form"
import { Todolist } from "features/todolists-list/todolists/ui/todolist/todolist"
import { ROUTES } from "common/configs/routes"
import { useActions, useAppSelector } from "common/hooks"
import { selectAuthIsLoggedIn } from "features/auth/model/auth.selectors"
import { selectTasks } from "features/todolists-list/tasks/model/tasks.selector"
import { selectTodolists } from "features/todolists-list/todolists/model/todolists.selector"

type PropsType = {
  demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({ demo = false }) => {
  const todolists = useAppSelector(selectTodolists)
  const tasks = useAppSelector(selectTasks)
  const isLoggedIn = useAppSelector(selectAuthIsLoggedIn)

  const { fetchTodolists, addTodolist: addTodolistThunk } = useActions({
    ...todolistsThunks,
    ...tasksThunks,
    ...todolistsActions,
  })

  useEffect(() => {
    if (!isLoggedIn || demo) return

    fetchTodolists()
  }, [demo, isLoggedIn])

  const addTodolistCallback = useCallback((title: string) => {
    addTodolistThunk({ title })
  }, [])

  if (!isLoggedIn) return <Navigate to={ROUTES.LOGIN} />

  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolistCallback} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((todolist) => {
          let filteredTasks = tasks[todolist.id]

          return (
            <Grid item key={todolist.id}>
              <Paper style={{ padding: "10px" }}>
                <Todolist todolist={todolist} tasks={filteredTasks} />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
