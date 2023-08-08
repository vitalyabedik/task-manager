import { ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useAppDispatch } from 'common/hooks/useAppDispatch';

/**
 * Custom hook that wraps Redux action creators with the dispatch function,
 * enabling their use within functional components.
 *
 * @template T - The type of the action creators object.
 * @param {T} actions - An object containing Redux action creators.
 * @returns {Object} An object with action creators mapped to the dispatch function.
 */

export const useActions = <T extends ActionCreatorsMapObject>(actions: T) => {
  const dispatch = useAppDispatch()

  return useMemo(() => bindActionCreators<T, RemapActionCreators<T>>(actions, dispatch), [actions, dispatch])
}

// Types
type IsValidArg<T> = T extends object ? (keyof T extends never ? false : true) : true
type ActionCreatorResponse<T extends (...args: any[]) => any> = ReturnType<ReturnType<T>>
type ReplaceReturnType<T, TNewReturn> = T extends (...args: any[]) => infer R
  ? IsValidArg<Extract<T, (...args: any[]) => any>> extends true
    ? (...args: Parameters<Extract<T, (...args: any[]) => any>>) => TNewReturn
    : () => TNewReturn
  : never

type RemapActionCreators<T extends ActionCreatorsMapObject> = {
  [K in keyof T]: ReplaceReturnType<T[K], ActionCreatorResponse<T[K]>>
}
