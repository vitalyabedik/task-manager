import React from "react"
import { Navigate } from "react-router-dom"

import Grid from "@mui/material/Grid"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

import { ROUTES } from "common/configs/routes"
import { useAppSelector, useLogin } from "common/hooks"
import { selectAuthIsLoggedIn, selectCaptchaUrl } from "features/auth/model/auth.selectors"
import { selectAppStatus } from "app/model/app.selectors"

export const Login = () => {
  const { formik } = useLogin()

  const appStatus = useAppSelector(selectAppStatus)
  const isLoggedIn = useAppSelector(selectAuthIsLoggedIn)
  const captchaUrl = useAppSelector(selectCaptchaUrl)

  const isEmailError = formik.touched.email && formik.errors.email
  const isPasswordError = formik.touched.password && formik.errors.password

  if (isLoggedIn) return <Navigate to={ROUTES.MAIN} />

  return (
    <Grid container justifyContent={"center"}>
      <Grid item justifyContent={"center"}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered
                <a href={"https://social-network.samuraijs.com/"} target={"_blank"} rel="noreferrer">
                  {" "}
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField label="Email" margin="normal" {...formik.getFieldProps("email")} />
              {isEmailError && <div style={{ color: "red" }}>{formik.errors.email}</div>}
              <TextField type="password" label="Password" margin="normal" {...formik.getFieldProps("password")} />
              {isPasswordError && <div style={{ color: "red" }}>{formik.errors.password}</div>}
              <FormControlLabel
                label={"Remember me"}
                control={<Checkbox checked={formik.values.rememberMe} {...formik.getFieldProps("rememberMe")} />}
              />
              {captchaUrl && <img src={captchaUrl} alt="captcha-img" />}
              {captchaUrl && (
                <TextField type="password" label="captcha" margin="normal" {...formik.getFieldProps("captcha")} />
              )}
              <Button
                disabled={!!isEmailError || !!isPasswordError || appStatus === "loading"}
                type={"submit"}
                variant={"contained"}
                color={"primary"}
              >
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}
