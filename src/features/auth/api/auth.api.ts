import { AxiosResponse } from "axios/index"

import { commonApi } from "common/api/common.api"
import { ResponseType } from "common/api/common.types.api"
import { LoginParamsType, UserData } from "features/auth/api/auth.types.api"
import { TodolistType } from "features/todolistsList/api"

export const authApi = {
  me() {
    return commonApi.get<ResponseType<UserData>>(`auth/me`)
  },
  login(data: LoginParamsType) {
    return commonApi.post<
      ResponseType<{ item: TodolistType }>,
      AxiosResponse<ResponseType<{ item: TodolistType }>>,
      LoginParamsType
    >("auth/login", data)
  },
  logout() {
    return commonApi.delete<ResponseType>(`auth/login`)
  },
}
