import React from "react"
import { FormikHelpers, useFormik } from "formik"

import { useActions } from "common/hooks/useActions"
import { authThunks } from "features/auth/model/auth.slice"
import { LoginParamsType } from "features/auth/api"
import { BaseResponseType } from "common/api"
import { validationLogin } from "common/utils"

export const useLogin = () => {
  const { login } = useActions(authThunks)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: validationLogin(),
    onSubmit: (values, formikHelpers: FormikHelpers<LoginParamsType>) => {
      login(values)
        .unwrap()
        .catch((reason: BaseResponseType) => {
          reason.fieldsErrors?.forEach((fieldError) => {
            formikHelpers.setFieldError(fieldError.field, fieldError.error)
          })
        })
    },
  })

  return { formik }
}
