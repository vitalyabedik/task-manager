import { useDispatch } from 'react-redux';
import { AppDispatch } from 'app/store';

/**
 * Custom React hook to obtain the Redux `dispatch` function specific to the application store.
 *
 * @returns {AppDispatch} The `dispatch` function from the Redux store, which can be used to dispatch actions.
 */

export const useAppDispatch = () => useDispatch<AppDispatch>()
