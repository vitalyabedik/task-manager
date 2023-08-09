import React from "react"

import Snackbar from "@mui/material/Snackbar"

import { useActions, useAppSelector } from "common/hooks"
import { appActions } from "app/model/app.slice"
import { selectAppError } from "app/model/app.selectors"
import { Alert } from "./alert"

export const ErrorSnackbar = () => {
  const error = useAppSelector(selectAppError)
  const { setAppError } = useActions(appActions)

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return
    }

    setAppError({ error: null })
  }
  return (
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {error} 😠
      </Alert>
    </Snackbar>
  )
}
