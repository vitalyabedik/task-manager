import React, { useCallback, useEffect } from "react"
import { Navigate } from "react-router-dom"

import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"

import { FilterValuesType, todolistsActions, todolistsThunks } from "features/todolistsList/model/todolists.slice"
import { tasksThunks } from "features/tasks/model/tasks.slice"
import { AddItemForm } from "common/components/AddItemForm"
import { Todolist } from "features/todolistsList/ui/Todolist/Todolist"
import { ROUTES } from "common/configs/routes"
import { useAppDispatch, useAppSelector } from "common/hooks/hooks"
import { selectAuthIsLoggedIn } from "features/auth/model/auth.selectors"
import { selectTasks } from "features/tasks/model/tasks.selector"
import { selectTodolists } from "features/todolistsList/model/todolists.selector"
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

    dispatch(todolistsThunks.getTodolists({}))
  }, [demo, isLoggedIn])

  const addTodolist = useCallback((title: string) => {
    dispatch(todolistsThunks.addTodolist({ title }))
  }, [])
  const removeTodolist = useCallback((todolistId: string) => {
    dispatch(todolistsThunks.removeTodolist({ todolistId }))
  }, [])
  const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
    dispatch(todolistsThunks.updateTodolistTitle({ todolistId, title }))
  }, [])

  const changeFilter = useCallback((todolistId: string, filter: FilterValuesType) => {
    dispatch(todolistsActions.changeTodolistFilter({ todolistId, filter }))
  }, [])

  const removeTask = useCallback((todolistId: string, id: string) => {
    dispatch(tasksThunks.deleteTask({ todolistId, taskId: id }))
  }, [])

  const addTask = useCallback((todolistId: string, title: string) => {
    dispatch(tasksThunks.addTask({ todolistId, title }))
  }, [])

  const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
    dispatch(tasksThunks.updateTask({ todolistId, taskId, domainModel: { status } }))
  }, [])

  const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
    dispatch(tasksThunks.updateTask({ todolistId, taskId, domainModel: { title } }))
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
