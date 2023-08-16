import React, { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

import "app/ui/app.css"

import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/icons-material/Menu"
import Container from "@mui/material/Container"
import { CircularProgress, LinearProgress } from "@mui/material"
import { Logout } from "@mui/icons-material"

import { TodolistsList } from "features/todolists-list/todolists-list"
import { RequestStatusType } from "app/model/app.slice"
import { ErrorSnackbar } from "common/components/error-snackbar"
import { ROUTES } from "common/configs/routes"
import { Login } from "features/auth/ui/login"
import { NotFound } from "common/components/not-found"
import { useActions, useAppSelector } from "common/hooks"
import { selectAuthIsLoggedIn } from "features/auth/model/auth.selectors"
import { authThunks } from "features/auth/model/auth.slice"

export const App = () => {
  const status = useAppSelector<RequestStatusType>((state) => state.app.status)
  const isInitialized = useAppSelector<boolean>((state) => state.app.isInitialized)
  const isLoggedIn = useAppSelector(selectAuthIsLoggedIn)

  const { initializeApp, logout } = useActions(authThunks)

  const onLogoutHandler = () => {
    logout()
  }

  useEffect(() => {
    initializeApp()
  }, [])

  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="App">
      <ErrorSnackbar />
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {isLoggedIn && (
            <Button onClick={onLogoutHandler} color="inherit">
              <Logout />
            </Button>
          )}
        </Toolbar>
        {status === "loading" && <LinearProgress />}
      </AppBar>
      <Container fixed>
        <Routes>
          <Route path={ROUTES.MAIN} element={<TodolistsList />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.NOTFOUND} element={<NotFound />} />
          <Route path={"*"} element={<Navigate to={ROUTES.NOTFOUND} />} />
        </Routes>
      </Container>
    </div>
  )
}
