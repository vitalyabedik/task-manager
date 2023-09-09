import { AppRootStateType } from "app/model/store"

export const selectAuthIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn

export const selectCaptchaUrl = (state: AppRootStateType) => state.auth.captchaUrl
