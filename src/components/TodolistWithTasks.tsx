import React, {ChangeEvent} from 'react';

import styles from './Todolist.module.css'

import {FilterType} from '../App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../state/store';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../state/tasks-reducer';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    filter: FilterType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    changeFilter: (todolistId: string, value: FilterType) => void
}

export const TodolistWithTasks = (props: PropsType) => {
    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.id])

    const dispatch = useDispatch()

    let allTasksForTodolist = tasks
    if (props.filter === 'active') {
        allTasksForTodolist = allTasksForTodolist.filter(el => !el.isDone)
    }
    if (props.filter === 'completed') {
        allTasksForTodolist = allTasksForTodolist.filter(el => el.isDone)
    }

    const addTask = (title: string) => {
        dispatch(addTaskAC(props.id, title))
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitleHandler = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    const onClickAllHandler = () => {
        props.changeFilter(props.id, 'all')
    }

    const onClickActiveHandler = () => {
        props.changeFilter(props.id, 'active')
    }

    const onClickCompletedHandler = () => {
        props.changeFilter(props.id, 'completed')
    }


    const onAllFilterBtnClasses = props.filter === 'all' ? styles.activeFilter : ''
    const onActiveFilterBtnClasses = props.filter === 'active' ? styles.activeFilter : ''
    const onCompletedFilterBtnClasses = props.filter === 'completed' ? styles.activeFilter : ''

    return (
        <div>

            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitleHandler}/>
                <IconButton onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addTask={addTask}/>
            <div>
                {
                    allTasksForTodolist.map(task => {
                        // удаление внутри map
                        const removeTaskHandler = () => {
                            dispatch(removeTaskAC(props.id, task.id))
                        }

                        // смена статуса checkbox внутри map
                        const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            dispatch(changeTaskStatusAC(props.id, task.id, e.currentTarget.checked))
                        }

                        const onChangeTitleHandler = (newTitle: string) => {
                            dispatch(changeTaskTitleAC(props.id, task.id, newTitle))
                        }

                        const taskStatusClasses = task.isDone ? styles.isDone : ''

                        return (
                            <div key={task.id} className={taskStatusClasses}>
                                <Checkbox onChange={onChangeCheckboxHandler}
                                          checked={task.isDone}
                                />
                                <EditableSpan onChange={onChangeTitleHandler} title={task.title}/>
                                <IconButton onClick={removeTaskHandler}>
                                    <Delete/>
                                </IconButton>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'} className={onAllFilterBtnClasses} onClick={onClickAllHandler}>All</Button>
                <Button variant={props.filter === 'active' ? 'contained' : 'text'} color={'primary'} className={onActiveFilterBtnClasses} onClick={onClickActiveHandler}>Active</Button>
                <Button variant={props.filter === 'completed' ? 'contained' : 'text'} color={'secondary'} className={onCompletedFilterBtnClasses} onClick={onClickCompletedHandler}>Completed</Button>
            </div>
        </div>
    )
}

