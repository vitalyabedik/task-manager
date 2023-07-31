import axios from "axios"
import { appActions } from "app/app.reducer"
import { AppDispatch } from "app/store"

export const handleServerNetworkError = (dispatch: AppDispatch, err: unknown) => {
  let errorMessage = "Some error occurred"

  if (axios.isAxiosError(err)) {
    errorMessage = err.response?.data?.message || err?.message || errorMessage
  } else if (err instanceof Error) {
    errorMessage = `Native error: ${err.message}`
  } else {
    errorMessage = JSON.stringify(err)
  }

  dispatch(appActions.setAppError({ error: errorMessage }))
  dispatch(appActions.setAppStatus({ status: "failed" }))
}
