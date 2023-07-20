import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Route, Routes, Navigate} from 'react-router-dom';

import './App.css';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import {CircularProgress, LinearProgress} from '@mui/material';
import {Logout} from '@mui/icons-material';

import {TodolistsList} from 'features/TodolistsList';
import {initializeAppTC, RequestStatusType} from './app-reducer';
import {ErrorSnackbar} from 'components/ErrorSnackbar';
import {TaskDomainType} from 'features/TodolistsList/Task/tasks-reducer';
import {ROUTES} from 'configs/routes';
import {Login} from 'features/auth';
import {NotFound} from 'components/NotFound';
import {logoutTC} from 'features/auth/auth-reducer';
import {useAppDispatch, useAppSelector} from 'hooks/hooks';
import {selectIsLoggedIn} from 'features/auth/auth-selectors';

export type TasksStateType = {
    [key: string]: TaskDomainType[]
}

export const App = () => {
    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector(selectIsLoggedIn)

    const dispatch = useAppDispatch()

    const onLogoutHandler = () => {
        dispatch(logoutTC())
    }

    useEffect(() => {
        // debugger
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    {isLoggedIn && <Button onClick={onLogoutHandler} color="inherit">
                        <Logout/>
                    </Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={ROUTES.MAIN} element={<TodolistsList/>}/>
                    <Route path={ROUTES.LOGIN} element={<Login/>}/>
                    <Route path={ROUTES.NOTFOUND} element={<NotFound/>}/>
                    <Route path={'*'} element={<Navigate to={ROUTES.NOTFOUND}/>}/>
                </Routes>
            </Container>
        </div>
    );
}




