import { ActionCreator, ActionCreatorsMapObject, AsyncThunk, bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useAppDispatch } from 'common/hooks/useAppDispatch';

/**
 * Custom React hook to bind Redux action creators to the dispatch function from the Redux store.
 *
 * @template Actions - The type of the action creators map object.
 * @param {Actions} actions - The map object containing the action creators to be bound.
 * @returns {BoundActions<Actions>} The bound actions object where action creators are connected to the dispatch function.
 */

export const useActions = <Actions extends ActionCreatorsMapObject = ActionCreatorsMapObject>(
  actions: Actions,
): BoundActions<Actions> => {
  const dispatch = useAppDispatch()

  return useMemo(() => bindActionCreators(actions, dispatch), [])
}

// Types
type BoundActions<Actions extends ActionCreatorsMapObject> = {
  [key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any> ? BoundAsyncThunk<Actions[key]> : Actions[key]
}

type BoundAsyncThunk<Action extends ActionCreator<any>> = (
  ...args: Parameters<Action>
) => ReturnType<ReturnType<Action>>
