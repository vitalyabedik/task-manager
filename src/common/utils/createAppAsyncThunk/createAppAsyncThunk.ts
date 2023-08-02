import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppDispatch, AppRootStateType } from 'app/store';
import { ResponseType } from 'common/api';

/**
 * Creates an async thunk with specific types for the application, using `createAsyncThunk` utility function.
 *
 * @template AppRootStateType - The type of the root state of the application.
 * @template AppDispatch - The type of the dispatch function from Redux to update the state.
 * @template ResponseType - The type of the expected response from the asynchronous operation.
 *
 * @returns {AsyncThunk} An instance of the created async thunk with specified types.
 */

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootStateType
  dispatch: AppDispatch
  rejectValue: null | ResponseType
}>()
