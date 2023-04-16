import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
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
}

export const Todolist = (props: PropsType) => {
    const [title, setTitle] = useState('')

    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
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

    const onClickAllHandler = () => {
        props.changeFilter('all')
    }

    const onClickActiveHandler = () => {
        props.changeFilter('active')
    }

    const onClickCompletedHandler = () => {
        props.changeFilter('completed')
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(task => {
                        // удаление внутри map
                        const removeTaskHandler = () => {
                            props.removeTask(task.id)
                        }

                        // debugger
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <button onClick={removeTaskHandler}>x</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={onClickAllHandler}>All</button>
                <button onClick={onClickActiveHandler}>Active</button>
                <button onClick={onClickCompletedHandler}>Completed</button>
            </div>
        </div>
    )
}