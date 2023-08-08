import axios from 'axios';
import { appActions } from 'app/model/app.reducer';
import { AppDispatch } from 'app/model/store';

/**
 * Handles server network errors and updates the application state accordingly.
 *
 * @param {AppDispatch} dispatch - The dispatch function from Redux to update the state.
 * @param {unknown} err - The error object received from the network request.
 */

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
