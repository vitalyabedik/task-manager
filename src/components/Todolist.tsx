import React, {useCallback} from 'react';

import styles from './Todolist.module.css'

import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import {Task} from './Task';
import {TaskStatuses, TaskType} from '../api/todolist-api';
import {FilterValuesType} from '../state/todolists-reducer';

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    removeTask: (todolistId: string, id: string) => void
    addTask: (todolistId: string, title: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    filter: FilterValuesType
}

export const Todolist = React.memo((props: PropsType) => {
    const removeTodolistHandler = useCallback(() => {
        props.removeTodolist(props.id)
    }, [props.removeTodolist, props.id])
    const changeTodolistTitleHandler = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [props.changeTodolistTitle, props.id])

    const onClickAllHandler = useCallback(() => {
        props.changeFilter(props.id, 'all')
    }, [props.changeFilter, props.id])

    const onClickActiveHandler = useCallback(() => {
        props.changeFilter(props.id,'active')
    }, [props.changeFilter, props.id])

    const onClickCompletedHandler = useCallback(() => {
        props.changeFilter(props.id,'completed')
    }, [props.changeFilter, props.id])

    const addTask = useCallback((title: string) => {
        props.addTask(props.id, title)
    }, [props.addTask, props.id])

    const onAllFilterBtnClasses = props.filter === 'all' ? styles.activeFilter : ''
    const onActiveFilterBtnClasses = props.filter === 'active' ? styles.activeFilter : ''
    const onCompletedFilterBtnClasses = props.filter === 'completed' ? styles.activeFilter : ''

    let filteredTasks = props.tasks
    if (props.filter === 'active') {
        filteredTasks = filteredTasks.filter(el => el.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        filteredTasks = filteredTasks.filter(el => el.status === TaskStatuses.Completed)
    }

    return (
        <div>

            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitleHandler}/>
                <IconButton onClick={removeTodolistHandler}>
                    <Delete />
                </IconButton>
            </h3>
           <AddItemForm addItem={addTask}/>
            <div>
                {
                    filteredTasks.map(task => {

                        return (
                            <Task
                                key={task.id}
                                todolistId={props.id}
                                task={task}
                                removeTask={props.removeTask}
                                changeTaskStatus={props.changeTaskStatus}
                                changeTaskTitle={props.changeTaskTitle}
                            />
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
})

