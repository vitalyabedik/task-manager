import React, {useReducer, useState} from 'react';

import './App.css';

import {TaskType, Todolist} from './components/Todolist';
import {v1} from 'uuid';
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
    todolistsReducer
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

export type FilterType = 'all' | 'active' | 'completed'

export const AppWithReducers = () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'active'},
        {id: todolistId2, title: 'What to buy', filter: 'completed'},
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer,{
        [todolistId1]: [
            {id: v1(), title: 'CSS&HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: false},
            {id: v1(), title: 'Mango', isDone: false},
            {id: v1(), title: 'Bananas', isDone: false},
            {id: v1(), title: 'Peaches', isDone: false},
        ],
    })

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }
    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatchToTodolists(changeTodolistTitleAC(todolistId, title))
    }

    const changeFilter = (todolistId: string, filter: FilterType) => {
        dispatchToTodolists(changeTodolistFilterAC(todolistId, filter))
    }

    const removeTask = (todolistId: string, id: string) => {
        dispatchToTasks(removeTaskAC(todolistId, id))
    }

    const addTask = (todolistId: string, title: string) => {
        dispatchToTasks(addTaskAC(todolistId, title))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, taskStatus: boolean) => {
        dispatchToTasks(changeTaskStatusAC(todolistId, taskId, taskStatus))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatchToTasks(changeTaskTitleAC(todolistId, taskId, title))
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


