export type FieldErrorType = {
  error: string
  field: string
}

export type ResponseType<D = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors: FieldErrorType[]
  data: D
}
