import { Dispatch } from "redux"

import { appActions } from "app/app.reducer"
import { ResponseType } from "common/api/common.types.api"

export const handleServerAppError = <T>(dispatch: Dispatch, data: ResponseType<T>, showError: boolean = true) => {
  if (showError) {
    dispatch(appActions.setAppError({ error: data.messages.length ? data.messages[0] : "Some error occurred" }))
  }

  dispatch(appActions.setAppStatus({ status: "failed" }))
}
