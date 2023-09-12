import React, { useEffect } from "react"

import "app/ui/app.css"
import Container from "@mui/material/Container"
import { CircularProgress } from "@mui/material"

import { ErrorSnackbar } from "common/components/error-snackbar"
import { useRoutes } from "common/configs/routes"
import { useActions, useAppSelector } from "common/hooks"
import { authThunks } from "features/auth/model/auth.slice"
import { Header } from "common/components/header"

export const App = () => {
  const isInitialized = useAppSelector<boolean>((state) => state.app.isInitialized)

  const { initializeApp } = useActions(authThunks)

  const routes = useRoutes()

  useEffect(() => {
    initializeApp()
  }, [])

  if (!isInitialized) {
    return (
      <div className="loader">
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="App">
      <ErrorSnackbar />
      <Header />
      <Container fixed>{routes}</Container>
    </div>
  )
}
