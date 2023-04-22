import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

import styles from './Todolist.module.css'

import {FilterType} from '../App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    addTask: (title: string) => void
    changeFilter: (value: FilterType) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean) => void
    filter: FilterType
}

export const Todolist = (props: PropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Title is required!')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
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
        props.changeFilter('all')
    }

    const onClickActiveHandler = () => {
        props.changeFilter('active')
    }

    const onClickCompletedHandler = () => {
        props.changeFilter('completed')
    }


    const inputClasses = error ? styles.error : ''
    const errorMessageClasses = error ? styles.errorMessage : ''
    const onAllFilterBtnClasses = props.filter === 'all' ? styles.activeFilter : ''
    const onActiveFilterBtnClasses = props.filter === 'active' ? styles.activeFilter : ''
    const onCompletedFilterBtnClasses = props.filter === 'completed' ? styles.activeFilter : ''

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input className={inputClasses} value={title} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
                <button onClick={addTaskHandler}>+</button>
                {error && <div className={errorMessageClasses}>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(task => {
                        // удаление внутри map
                        const removeTaskHandler = () => {
                            props.removeTask(task.id)
                        }

                        // смена статуса checkbox внутри map
                        const onChangeCheckboxHandler = ( e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(task.id, e.currentTarget.checked)
                        }

                        const taskStatusClasses = task.isDone ? styles.isDone : ''

                        return (
                            <li key={task.id} className={taskStatusClasses}>
                                <input onChange={onChangeCheckboxHandler}
                                       type="checkbox"
                                       checked={task.isDone}
                                />
                                <span>{task.title}</span>
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