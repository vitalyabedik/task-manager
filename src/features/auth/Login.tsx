import React from 'react'
import {useFormik} from 'formik';
import * as Yup from 'yup';

import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {loginTC} from './auth-reducer';

import {Navigate} from 'react-router-dom';
import {ROUTES} from 'configs/routes';
import {useAppDispatch, useAppSelector} from 'hooks/hooks';
import {selectAuthIsLoggedIn} from 'features/auth/auth.selectors';

export const Login = () => {
    const isLoggedIn = useAppSelector(selectAuthIsLoggedIn)

    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string()
                .min(3, 'Password must be 3 characters or more')
                .required('Required'),
        }),
        onSubmit: values => {
            // alert(JSON.stringify(values));
            dispatch(loginTC(values))
            formik.resetForm()
        },
    })

    if (isLoggedIn) return <Navigate to={ROUTES.MAIN}/>

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="Email"
                                   margin="normal"
                                   {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email &&
                            <div style={{color: 'red'}}>{formik.errors.email}</div>}
                        <TextField type="password"
                                   label="Password"
                                   margin="normal"
                                   {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password &&
                            <div style={{color: 'red'}}>{formik.errors.password}</div>}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox checked={formik.values.rememberMe}
                                               {...formik.getFieldProps('rememberMe')}
                            />}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}