import React, {ChangeEvent, useEffect, useState} from 'react'

import {todolistAPI} from '../api/todolist-api';

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistAPI.getTodolist()
            .then(res => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<any>(null)

    const onChangeTodolistTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const createTodolistHandler = () => {
        todolistAPI.createTodolist(title)
            .then(res => {
                setState(res.data)
            })
    }

    // useEffect(() => {
    //     const title = 'Graph QL'
    //     todolistAPI.createTodolist(title)
    //         .then(res => {
    //             setState(res.data)
    //         })
    // }, [])

    return <div>{JSON.stringify(state)}
        <div>
            <input onChange={onChangeTodolistTitleHandler}
                   value={title}
                   type="text"
                   placeholder={'todolistTitle'}
            />
            <button onClick={createTodolistHandler}>create Todolist</button>
        </div>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)

    const onChangeTodolistIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    const deleteTodolistHandler = () => {
        todolistAPI.deleteTodolist(todolistId)
            .then(res => {
                setState(res.data)
            })
    }

    // useEffect(() => {
    //     const todolistId = 'a29c8b16-25c4-46a9-950d-6b611cf055d6'
    //
    //     todolistAPI.deleteTodolist(todolistId)
    //         .then(res => {
    //             setState(res.data)
    //         })
    // }, [])

    return <div>{JSON.stringify(state)}
        <div>
            <input onChange={onChangeTodolistIdHandler}
                   value={todolistId}
                   type="text"
                   placeholder={'todolistId'}
            />
            <button onClick={deleteTodolistHandler}>delete Todolist</button>
        </div>
    </div>
}


export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [title, setTitle] = useState<any>(null)

    const onChangeTodolistIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    const onChangeTodolistTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const updateTodolistHandler = () => {
        todolistAPI.updateTodolist(todolistId, title)
            .then(res => {
                setState(res.data)
            })
    }

    // useEffect(() => {
    //     const todolistId = '461d0482-c906-4804-a69e-a91020637cae'
    //     const title = 'TS'
    //
    //     todolistAPI.deleteTodolist(todolistId)
    //         .then(res => {
    //             setState(res.data)
    //         })
    // }, [])

    return <div>{JSON.stringify(state)}
        <div>
            <input onChange={onChangeTodolistIdHandler}
                   value={todolistId}
                   type="text"
                   placeholder={'todolistId'}
            />
            <input onChange={onChangeTodolistTitleHandler}
                   value={title}
                   type="text"
                   placeholder={'todolistTitle'}
            />
            <button onClick={updateTodolistHandler}>update Todolist Title</button>
        </div>
    </div>
}

export const GetTodolistTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'c6b052ba-a79f-4832-9461-b38ace162c97'
        // const todolistId = '6d482de6-cb88-405a-b708-268780b6d422'
        // const todolistId = 'b7c22e38-7f42-4093-835a-0d0c7cdf5d04'

        todolistAPI.getTodolistTasks(todolistId)
            .then(res => {
                console.log(res.data)
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolistTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [title, setTitle] = useState<any>(null)

    const onChangeTodolistIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    const onChangeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const createTaskHandler = () => {
        todolistAPI.createTodolistTask(todolistId, title)
            .then(res => {
                setState(res.data)
            })
    }

    // useEffect(() => {
    //     const todolistId = '461d0482-c906-4804-a69e-a91020637cae'
    //     const title = 'NEW-TASK'
    //
    //     todolistAPI.createTodolistTask(todolistId, title)
    //         .then(res => {
    //             setState(res.data)
    //         })
    // }, [])

    return <div>{JSON.stringify(state)}
        <div>
            <input onChange={onChangeTodolistIdHandler}
                   value={todolistId}
                   type="text"
                   placeholder={'todolistId'}
            />
            <input onChange={onChangeTaskTitleHandler}
                   value={title}
                   type="text"
                   placeholder={'taskTitle'}
            />
            <button onClick={createTaskHandler}>create task</button>
        </div>
    </div>
}

export const DeleteTodolistTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>(null)


    // useEffect(() => {
    //     const todolistId = '461d0482-c906-4804-a69e-a91020637cae'
    //     const taskId = '04d8cb75-4eb3-4f9c-bd5d-8135ca41ff7e'
    //
    //     todolistAPI.deleteTodolistTask(todolistId, taskId)
    //         .then(res => {
    //             setState(res.data)
    //         })
    // }, [])

    const onChangeTodolistIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    const onChangeTaskIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }

    const deleteTaskHandler = () => {
        // const todolistId = '461d0482-c906-4804-a69e-a91020637cae'
        // const taskId = '04d8cb75-4eb3-4f9c-bd5d-8135ca41ff7e'

        todolistAPI.deleteTodolistTask(todolistId, taskId)
            .then(res => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input onChange={onChangeTodolistIdHandler}
                   value={todolistId}
                   type="text"
                   placeholder={'todolistId'}
            />
            <input onChange={onChangeTaskIdHandler}
                   value={taskId}
                   type="text"
                   placeholder={'taskId'}
            />
            <button onClick={deleteTaskHandler}>delete task</button>
        </div>
    </div>
}

export const UpdateTodolistTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>(null)
    const [title, setTitle] = useState<any>(null)

    const onChangeTodolistIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    const onChangeTaskIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }

    const onChangeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const updateTaskHandler = () => {
        todolistAPI.updateTodolistTask(todolistId, taskId, title)
            .then(res => {
                setState(res.data)
            })
    }

    // useEffect(() => {
    //     const todolistId = '461d0482-c906-4804-a69e-a91020637cae'
    //     const taskId = '82a74f7b-3e0d-473b-80c7-b665823f8a4c'
    //     const title = 'FRONTEND'
    //
    //     todolistAPI.updateTodolistTask(todolistId, taskId, title)
    //         .then(res => {
    //             setState(res.data)
    //         })
    //
    // }, [])

    return <div>{JSON.stringify(state)}
        <div>
            <input onChange={onChangeTodolistIdHandler}
                   value={todolistId}
                   type="text"
                   placeholder={'todolistId'}
            />
            <input onChange={onChangeTaskIdHandler}
                   value={taskId}
                   type="text"
                   placeholder={'taskId'}
            />
            <input onChange={onChangeTaskTitleHandler}
                   value={title}
                   type="text"
                   placeholder={'taskTitle'}
            />
            <button onClick={updateTaskHandler}>update task title</button>
        </div>
    </div>
}

