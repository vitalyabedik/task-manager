import { AppRootStateType } from "app/model/store"

export const selectAppStatus = (state: AppRootStateType) => state.app.status
export const selectAppError = (state: AppRootStateType) => state.app.error
export const selectAppIsInitialized = (state: AppRootStateType) => state.app.isInitialized
