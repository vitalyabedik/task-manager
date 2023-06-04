import React from 'react';

import './App.css';

import {TaskType, Todolist} from './components/Todolist';
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
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TodolistWithTasks} from './components/TodolistWithTasks';

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

export type FilterType = 'all' | 'active' | 'completed'

export const AppWithReduxWithoutTasks = () => {
    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }
    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }

    const changeFilter = (todolistId: string, filter: FilterType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    }

    const removeTask = (todolistId: string, id: string) => {
        dispatch(removeTaskAC(todolistId, id))
    }

    const addTask = (todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, taskStatus: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, taskStatus))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, title))
    }

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
                    <AddItemForm addTask={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(todolist => {

                            let filteredTasks = tasks[todolist.id]

                            if (todolist.filter === 'active') {
                                filteredTasks = filteredTasks.filter(el => !el.isDone)
                            }
                            if (todolist.filter === 'completed') {
                                filteredTasks = filteredTasks.filter(el => el.isDone)
                            }

                            return (
                                <Grid item>
                                    <Paper style={{padding: '10px'}}>
                                        <TodolistWithTasks key={todolist.id}
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


