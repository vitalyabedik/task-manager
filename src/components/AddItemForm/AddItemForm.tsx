import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ControlPoint from '@mui/icons-material/ControlPoint';

type AddItemFormPropsType = {
    disabled?: boolean
    addItem: (title: string) => void
}
export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required!')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
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
            <IconButton disabled={props.disabled} onClick={addTaskHandler} color={'primary'} >
                <ControlPoint/>
            </IconButton>
            {/*<Button onClick={addTaskHandler} variant={'contained'}>+</Button>*/}
        </div>
    )
})