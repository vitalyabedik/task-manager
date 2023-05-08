import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from './Todolist.module.css';

type AddItemFormPropsType = {
    addTask: (title: string) => void
}
export const AddItemForm = (props: AddItemFormPropsType) => {
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

    const inputClasses = error ? styles.error : ''
    const errorMessageClasses = error ? styles.errorMessage : ''

    return (
        <div>
            <input className={inputClasses} value={title} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
            <button onClick={addTaskHandler}>+</button>
            {error && <div className={errorMessageClasses}>{error}</div>}
        </div>
    )
}