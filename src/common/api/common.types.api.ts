export type FieldErrorType = {
  error: string
  field: string
}

export type BaseResponseType<D = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors: FieldErrorType[]
  data: D
}
