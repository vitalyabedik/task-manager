import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ControlPoint from '@mui/icons-material/ControlPoint';

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

    return (
        <div>
            <TextField variant={'outlined'}
                       size={'small'}
                       label={'Type value'}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       error={!!error}
                       helperText={error}
            />
            <IconButton onClick={addTaskHandler} color={'primary'} >
                <ControlPoint/>
            </IconButton>
            {/*<Button onClick={addTaskHandler} variant={'contained'}>+</Button>*/}
        </div>
    )
}