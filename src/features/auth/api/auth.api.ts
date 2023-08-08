import { AxiosResponse } from "axios/index"

import { commonApi } from "common/api/common.api"
import { BaseResponseType } from "common/api/common.api.types"
import { LoginParamsType, UserData } from "features/auth/api/auth.api.types"
import { TodolistType } from "features/todolists-list/todolists/api"

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
