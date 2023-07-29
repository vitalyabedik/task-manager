export type ResponseType<D = {}> = {
  resultCode: number
  messages: Array<string>
  fieldsErrors: Array<string>
  data: D
}

export type ErrorType = {
  statusCode: number
  messages: [
    {
      message: string
      field: string
    },
  ]
  error: string
}
