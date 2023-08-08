import { AppDispatch, AppRootStateType } from 'app/model/store';
import { handleServerNetworkError } from 'common/utils/errors';
import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { appActions } from 'app/model/app.reducer';
import { BaseResponseType } from 'common/api/common.api.types';

/**
 * A utility function that wraps asynchronous logic in a try-catch block with specific error handling.
 *
 * @template T - The type of the expected result from the asynchronous logic.
 * @param {BaseThunkAPI<AppRootStateType, any, AppDispatch, null | ResponseType>} thunkAPI - The base thunk API provided by Redux Toolkit.
 * @param {() => Promise<T>} logic - The asynchronous function that contains the logic to be executed in the try block.
 * @returns {Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>>} A promise that resolves with the result of the logic if successful,
 *    or rejects with a specific value from `thunkAPI.rejectWithValue` if an error occurs.
 */

export const thunkTryCatch = async <T>(
  thunkAPI: BaseThunkAPI<AppRootStateType, any, AppDispatch, null | BaseResponseType>,
  logic: () => Promise<T>,
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
  const { dispatch, rejectWithValue } = thunkAPI
  dispatch(appActions.setAppStatus({ status: "loading" }))
  try {
    return await logic()
  } catch (e) {
    handleServerNetworkError(dispatch, e)
    return rejectWithValue(null)
  } finally {
    dispatch(appActions.setAppStatus({ status: "idle" }))
  }
}
