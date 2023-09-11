import React, { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

import "app/ui/app.css"
import Container from "@mui/material/Container"
import { CircularProgress } from "@mui/material"

import { TodolistsList } from "features/todolists-list/todolists-list"
import { ErrorSnackbar } from "common/components/error-snackbar"
import { ROUTES } from "common/configs/routes"
import { Login } from "features/auth/ui/login"
import { NotFound } from "common/components/not-found"
import { useActions, useAppSelector } from "common/hooks"
import { authThunks } from "features/auth/model/auth.slice"
import { Header } from "common/components/header"

export const App = () => {
  const isInitialized = useAppSelector<boolean>((state) => state.app.isInitialized)

  const { initializeApp } = useActions(authThunks)

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
      <Header />
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
