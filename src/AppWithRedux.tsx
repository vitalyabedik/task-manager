import React, {useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';

import './App.css';

import { Todolist} from './components/Todolist';
import {AddItemForm} from './components/AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, changeTodolistTitleTC, fetchTodolistsTC, FilterValuesType,
    removeTodolistTC,
} from './state/todolists-reducer';
import {
    addTaskTC,
    removeTaskTC,
    updateTaskTC
} from './state/tasks-reducer';
import {AppRootStateType, useAppDispatch} from './state/store';
import {TaskStatuses, TaskType} from './api/todolist-api';

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

export const AppWithRedux = () => {
    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    const addTodolist = useCallback((title: string) => {
        // const action = addTodolistAC(title)
        // dispatch(action)

        dispatch(addTodolistTC(title))
    }, [])
    const removeTodolist = useCallback((todolistId: string) => {
        // const action = removeTodolistAC(todolistId)
        // dispatch(action)

        dispatch(removeTodolistTC(todolistId))
    }, [])
    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        // dispatch(changeTodolistTitleAC(todolistId, title))

        dispatch(changeTodolistTitleTC(todolistId, title))
    }, [])

    const changeFilter = useCallback((todolistId: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    }, [])

    const removeTask = useCallback((todolistId: string, id: string) => {
        // dispatch(removeTaskAC(todolistId, id))

        dispatch(removeTaskTC(todolistId, id))
    }, [])

    const addTask = useCallback((todolistId: string, title: string) => {
        // dispatch(addTaskAC(todolistId, title))
        dispatch(addTaskTC(todolistId, title))
    }, [])

    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        // dispatch(changeTaskStatusAC(todolistId, taskId, status))

        dispatch(updateTaskTC(todolistId, taskId, {status}))
    }, [])

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        // dispatch(changeTaskTitleAC(todolistId, taskId, title))

        dispatch(updateTaskTC(todolistId, taskId, {title}))
    }, [])

    return (
        <div className="App">
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
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(todolist => {
                            let filteredTasks = tasks[todolist.id]

                            return (
                                <Grid item key={todolist.id}>
                                    <Paper style={{padding: '10px'}}>
                                        <Todolist key={todolist.id}
                                                  id={todolist.id}
                                                  title={todolist.title}
                                                  tasks={filteredTasks}
                                                  removeTodolist={removeTodolist}
                                                  changeTodolistTitle={changeTodolistTitle}
                                                  removeTask={removeTask}
                                                  changeFilter={changeFilter}
                                                  addTask={addTask}
                                                  changeTaskStatus={changeTaskStatus}
                                                  changeTaskTitle={changeTaskTitle}
                                                  filter={todolist.filter}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }</Grid>
            </Container>
        </div>
    );
}


