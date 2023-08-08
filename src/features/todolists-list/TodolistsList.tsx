import React, { useCallback, useEffect } from "react"
import { Navigate } from "react-router-dom"

import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"

import {
  FilterValuesType,
  todolistsActions,
  todolistsThunks,
} from "features/todolists-list/todolists/model/todolists.reducer"
import { tasksThunks } from "features/todolists-list/tasks/model/tasks.reducer"
import { AddItemForm } from "common/components/AddItemForm"
import { Todolist } from "features/todolists-list/todolists/ui/todolist/Todolist"
import { ROUTES } from "common/configs/routes"
import { useActions, useAppSelector } from "common/hooks"
import { selectAuthIsLoggedIn } from "features/auth/model/auth.selectors"
import { selectTasks } from "features/todolists-list/tasks/model/tasks.selector"
import { selectTodolists } from "features/todolists-list/todolists/model/todolists.selector"
import { TaskStatuses } from "common/enums"

type TodolistsPropsType = {
  demo?: boolean
}

export const TodolistsList = ({ demo = false }: TodolistsPropsType) => {
  const todolists = useAppSelector(selectTodolists)
  const tasks = useAppSelector(selectTasks)
  const isLoggedIn = useAppSelector(selectAuthIsLoggedIn)

  const {
    getTodolists,
    addTodolist: addTodolistThunk,
    removeTodolist: removeTodolistThunk,
    updateTodolistTitle: updateTodolistTitleThunk,
    addTask: addTaskThunk,
    deleteTask,
    updateTask,
    changeTodolistFilter,
  } = useActions({ ...todolistsThunks, ...tasksThunks, ...todolistsActions })

  useEffect(() => {
    if (!isLoggedIn || demo) return

    getTodolists()
  }, [demo, isLoggedIn])

  const addTodolist = useCallback((title: string) => {
    addTodolistThunk({ title })
  }, [])

  const removeTodolist = useCallback((todolistId: string) => {
    removeTodolistThunk({ todolistId })
  }, [])

  const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
    updateTodolistTitleThunk({ todolistId, title })
  }, [])

  const changeFilter = useCallback((todolistId: string, filter: FilterValuesType) => {
    changeTodolistFilter({ todolistId, filter })
  }, [])

  const removeTask = useCallback((todolistId: string, id: string) => {
    deleteTask({ todolistId, taskId: id })
  }, [])

  const addTask = useCallback((todolistId: string, title: string) => {
    addTaskThunk({ todolistId, title })
  }, [])

  const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
    updateTask({ todolistId, taskId, domainModel: { status } })
  }, [])

  const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
    updateTask({ todolistId, taskId, domainModel: { title } })
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
