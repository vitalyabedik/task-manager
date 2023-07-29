import { Dispatch } from "redux"
import { appActions } from "app/app.reducer"

export const handleServerNetworkError = (dispatch: Dispatch, error: string) => {
  dispatch(appActions.setAppError({ error }))
  dispatch(appActions.setAppStatus({ status: "failed" }))
}
