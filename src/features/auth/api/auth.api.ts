import { AxiosResponse } from "axios/index"

import { commonApi } from "common/api/common.api"
import { BaseResponseType } from "common/api/common.types.api"
import { LoginParamsType, UserData } from "features/auth/api/auth.types.api"
import { TodolistType } from "features/todolistsList/api"

export const authApi = {
  me() {
    return commonApi.get<BaseResponseType<UserData>>(`auth/me`)
  },
  login(data: LoginParamsType) {
    return commonApi.post<
      BaseResponseType<{ item: TodolistType }>,
      AxiosResponse<BaseResponseType<{ item: TodolistType }>>,
      LoginParamsType
    >("auth/login", data)
  },
  logout() {
    return commonApi.delete<BaseResponseType>(`auth/login`)
  },
}
