import React, { useCallback, useEffect } from "react"
import { Navigate } from "react-router-dom"

import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"

import {
  addTodolistTC,
  changeTodolistTitleTC,
  fetchTodolistsTC,
  FilterValuesType,
  removeTodolistTC,
  todolistsActions,
} from "features/TodolistsList/model/todolists.reducer"
import { addTaskTC, removeTaskTC, updateTaskTC } from "features/TodolistsList/model/tasks.reducer"
import { AddItemForm } from "common/components/AddItemForm"
import { Todolist } from "features/TodolistsList/ui/Todolist/Todolist"
import { ROUTES } from "common/configs/routes"
import { useAppDispatch, useAppSelector } from "common/hooks/hooks"
import { selectAuthIsLoggedIn } from "features/auth/model/auth.selectors"
import { selectTasks } from "features/TodolistsList/model/tasks.selector"
import { selectTodolists } from "features/TodolistsList/model/todolists.selector"
import { TaskStatuses } from "common/enums"

type TodolistsPropsType = {
  demo?: boolean
}

export const TodolistsList = ({ demo = false }: TodolistsPropsType) => {
  const todolists = useAppSelector(selectTodolists)
  const tasks = useAppSelector(selectTasks)
  const isLoggedIn = useAppSelector(selectAuthIsLoggedIn)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isLoggedIn || demo) return

    dispatch(fetchTodolistsTC())
  }, [demo, isLoggedIn])

  const addTodolist = useCallback((title: string) => {
    dispatch(addTodolistTC(title))
  }, [])
  const removeTodolist = useCallback((todolistId: string) => {
    dispatch(removeTodolistTC(todolistId))
  }, [])
  const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
    dispatch(changeTodolistTitleTC(todolistId, title))
  }, [])

  const changeFilter = useCallback((todolistId: string, filter: FilterValuesType) => {
    dispatch(todolistsActions.changeTodolistFilter({ todolistId, filter }))
  }, [])

  const removeTask = useCallback((todolistId: string, id: string) => {
    dispatch(removeTaskTC(todolistId, id))
  }, [])

  const addTask = useCallback((todolistId: string, title: string) => {
    dispatch(addTaskTC(todolistId, title))
  }, [])

  const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
    dispatch(updateTaskTC(todolistId, taskId, { status }))
  }, [])

  const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
    dispatch(updateTaskTC(todolistId, taskId, { title }))
  }, [])

  if (!isLoggedIn) return <Navigate to={ROUTES.LOGIN} />

  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((todolist) => {
          let filteredTasks = tasks[todolist.id]

          return (
            <Grid item key={todolist.id}>
              <Paper style={{ padding: "10px" }}>
                <Todolist
                  key={todolist.id}
                  id={todolist.id}
                  title={todolist.title}
                  tasks={filteredTasks}
                  filter={todolist.filter}
                  entityStatus={todolist.entityStatus}
                  removeTodolist={removeTodolist}
                  changeTodolistTitle={changeTodolistTitle}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  removeTask={removeTask}
                  changeTaskStatus={changeTaskStatus}
                  changeTaskTitle={changeTaskTitle}
                />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
