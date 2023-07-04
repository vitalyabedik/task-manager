import {useSelector} from 'react-redux';
import React, {useCallback, useEffect} from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import {AppRootStateType, useAppDispatch} from '../../app/store';
import {
    addTodolistTC, changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC
} from './todolists-reducer';
import {addTaskTC, removeTaskTC, updateTaskTC} from './Task/tasks-reducer';
import {TaskStatuses} from '../../api/todolist-api';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {Todolist} from './Todolist';
import {TasksStateType, TodolistType} from '../../app';

export const TodolistsList = () => {
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
        <>
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
                }
            </Grid>
        </>
    )
}