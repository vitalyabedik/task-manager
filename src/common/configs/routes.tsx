import { useMemo } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

import { TodolistsList } from "features/todolists-list"
import { Login } from "features/auth/ui/login"
import { NotFound } from "common/components"

export const ROUTES = {
  MAIN: "/",
  LOGIN: "/login",
  NOTFOUND: "/404",
}

const getRoutes = (): JSX.Element => (
  <Routes>
    <Route path={ROUTES.MAIN} element={<TodolistsList />} />
    <Route path={ROUTES.LOGIN} element={<Login />} />
    <Route path={ROUTES.NOTFOUND} element={<NotFound />} />
    <Route path={"*"} element={<Navigate to={ROUTES.NOTFOUND} />} />
  </Routes>
)

export const useRoutes = (): JSX.Element => {
  return useMemo(() => getRoutes(), [])
}
