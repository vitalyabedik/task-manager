import * as Yup from "yup"

export const validationLogin = () => {
  return Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().min(3, "Password must be 3 characters or more").required("Required"),
  })
}