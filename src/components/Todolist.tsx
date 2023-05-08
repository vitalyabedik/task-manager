import React, {ChangeEvent} from 'react';

import styles from './Todolist.module.css'

import {FilterType} from '../App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    removeTask: (todolistId: string, id: string) => void
    addTask: (todolistId: string, title: string) => void
    changeFilter: (todolistId: string, value: FilterType) => void
    changeTaskStatus: (todolistId: string, taskId: string, taskStatus: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    filter: FilterType
}

export const Todolist = (props: PropsType) => {
    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitleHandler = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }


    // удаление вне map
    // const removeTaskHandler = (tID: string) => {
    //     props.removeTask(tID)
    // }

    // смена статуса checkbox вне map
    // const onChangeCheckboxHandler = (id: string, e: ChangeEvent<HTMLInputElement>) => {
    //     props.changeTaskStatus(id, e.currentTarget.checked)
    // }

    const onClickAllHandler = () => {
        props.changeFilter(props.id, 'all')
    }

    const onClickActiveHandler = () => {
        props.changeFilter(props.id,'active')
    }

    const onClickCompletedHandler = () => {
        props.changeFilter(props.id,'completed')
    }

    const addTask = (title: string) => {
        props.addTask(props.id, title)
    }

    const onAllFilterBtnClasses = props.filter === 'all' ? styles.activeFilter : ''
    const onActiveFilterBtnClasses = props.filter === 'active' ? styles.activeFilter : ''
    const onCompletedFilterBtnClasses = props.filter === 'completed' ? styles.activeFilter : ''

    return (
        <div>

            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitleHandler}/>
                <button onClick={removeTodolistHandler}>x</button>
            </h3>
           <AddItemForm addTask={addTask}/>
            <ul>
                {
                    props.tasks.map(task => {
                        // удаление внутри map
                        const removeTaskHandler = () => {
                            props.removeTask(props.id, task.id)
                        }

                        // смена статуса checkbox внутри map
                        const onChangeCheckboxHandler = ( e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(props.id, task.id, e.currentTarget.checked)
                        }

                        const onChangeTitleHandler = (newTitle: string) => {
                            props.changeTaskTitle(props.id, task.id, newTitle)
                        }

                        const taskStatusClasses = task.isDone ? styles.isDone : ''

                        return (
                            <li key={task.id} className={taskStatusClasses}>
                                <input onChange={onChangeCheckboxHandler}
                                       type="checkbox"
                                       checked={task.isDone}
                                />
                                <EditableSpan onChange={onChangeTitleHandler} title={task.title}/>
                                <button onClick={removeTaskHandler}>x</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className={onAllFilterBtnClasses} onClick={onClickAllHandler}>All</button>
                <button className={onActiveFilterBtnClasses} onClick={onClickActiveHandler}>Active</button>
                <button className={onCompletedFilterBtnClasses} onClick={onClickCompletedHandler}>Completed</button>
            </div>
        </div>
    )
}

