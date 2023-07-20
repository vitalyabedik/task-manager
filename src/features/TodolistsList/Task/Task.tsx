import React, {ChangeEvent, useCallback} from 'react';

import styles from '../Todolist/Todolist.module.css';

import Checkbox from '@mui/material/Checkbox';
import {EditableSpan} from 'components/EditableSpan';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';

import {TaskStatuses} from 'api/todolist-api';
import {TaskDomainType} from './tasks-reducer';

type TaskPropsType = {
    task: TaskDomainType
    todolistId: string
    removeTask: (todolistId: string, id: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    const removeTaskHandler = useCallback(() => {
        props.removeTask(props.todolistId, props.task.id)
    }, [props.todolistId, props.task.id])

    const onChangeCheckboxHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.todolistId, props.task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
    }, [props.todolistId, props.task.id])

    const onChangeTitleHandler = useCallback((newTitle: string) => {
        props.changeTaskTitle(props.todolistId, props.task.id, newTitle)
    }, [props.todolistId, props.task.id])

    const taskStatusClasses = props.task.status === TaskStatuses.Completed ? styles.isDone : ''

    return (
        <div key={props.task.id} className={taskStatusClasses}>
            <Checkbox disabled={props.task.entityStatus === 'loading'}
                      onChange={onChangeCheckboxHandler}
                      checked={props.task.status === TaskStatuses.Completed}
            />
            <EditableSpan disabled={props.task.entityStatus === 'loading'} onChange={onChangeTitleHandler}
                          title={props.task.title}/>
            <IconButton disabled={props.task.entityStatus === 'loading'} onClick={removeTaskHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
});

