import React from "react"

import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/icons-material/Menu"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { Logout } from "@mui/icons-material"
import { LinearProgress } from "@mui/material"

import { useActions, useAppSelector } from "common/hooks"
import { RequestStatusType } from "app/model/app.slice"
import { selectAuthIsLoggedIn } from "features/auth/model/auth.selectors"
import { authThunks } from "features/auth/model/auth.slice"

export const Header = () => {
  const status = useAppSelector<RequestStatusType>((state) => state.app.status)
  const isLoggedIn = useAppSelector(selectAuthIsLoggedIn)

  const { logout } = useActions(authThunks)

  const onLogoutHandler = () => logout()

  return (
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
  )
}
