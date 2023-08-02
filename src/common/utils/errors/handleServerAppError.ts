import { Dispatch } from 'redux';

import { appActions } from 'app/app.reducer';
import { ResponseType } from 'common/api/common.types.api';

/**
 * Handles server application errors and updates the application state accordingly.
 *
 * @template T - The type of data received from the server response.
 * @param {Dispatch} dispatch - The dispatch function from Redux to update the state.
 * @param {ResponseType<T>} data - The server response data containing the error messages.
 * @param {boolean} [showError=true] - A flag indicating whether to show the error message or not. Default is true.
 */

export const handleServerAppError = <T>(dispatch: Dispatch, data: ResponseType<T>, showError: boolean = true) => {
  if (showError) {
    dispatch(appActions.setAppError({ error: data.messages.length ? data.messages[0] : "Some error occurred" }))
  }

  dispatch(appActions.setAppStatus({ status: "failed" }))
}
