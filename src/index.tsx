import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"

import "./index.css"

import { App } from "app/ui/app"
import { store } from "app/model/store"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <BrowserRouter basename="/it-incubator.todolist-learning">
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
)
