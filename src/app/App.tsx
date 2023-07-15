import React from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';

import './App.css';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import {LinearProgress} from '@mui/material';

import {useAppSelector} from './store';
import {FilterValuesType} from '../features/TodolistsList/todolists-reducer';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import {RequestStatusType} from './app-reducer';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {TaskDomainType} from '../features/TodolistsList/Task/tasks-reducer';
import {ROUTES} from '../configs/routes';
import {Login} from '../features/Login';
import {NotFound} from '../components/NotFound';


export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskDomainType[]
}

export const App = () => {
    const status = useAppSelector<RequestStatusType>(state => state.app.status)

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
                    <Button color="inherit">Login</Button>
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




