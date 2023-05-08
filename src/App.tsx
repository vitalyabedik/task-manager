import React, {useState} from 'react';

import './App.css';

import {TaskType, Todolist} from './components/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

type TasksStateType = {
    [key: string] : TaskType[]
}

export type FilterType = 'all' | 'active' | 'completed'

const App = () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'active'},
        {id: todolistId2, title: 'What to buy', filter: 'completed'},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'CSS&HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: false},
            {id: v1(), title: 'Mango', isDone: false},
            {id: v1(), title: 'Bananas', isDone: false},
            {id: v1(), title: 'Peaches', isDone: false},
        ],
    })

    const addTodolist = (title: string) => {
        let todolist: TodolistType = {
            id: v1(),
            filter: 'all',
            title: title
        }

        setTodolists([todolist, ...todolists])
        setTasks({...tasks, [todolist.id]: []})
    }
    const removeTodolist = (todolistId: string) => {
        // remove todolist
        const filteredTodolist = todolists.filter(t => t.id !== todolistId)
        setTodolists([...filteredTodolist])

        // remove tasks from deleted todolist
        delete tasks[todolistId]
        setTasks({...tasks})
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, title: title} : el))
    }

    const removeTask = (todolistId: string, id: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== id)})

        // const todolistTasks = tasks[todolistId]
        // const filteredTasks = todolistTasks.filter(t => t.id !== id)
        // tasks[todolistId] = filteredTasks
        // setTasks({...tasks})

    }
    const addTask = (todolistId: string, title: string) => {
        const newTask = {
            id: v1(),
            title,
            isDone: false
        }
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})

        // const todolistTasks = tasks[todolistId]
        // const newTasks = [newTask, ...todolistTasks]
        // tasks[todolistId] = newTasks
        // setTasks({...tasks})
    }
    const changeFilter = (todolistId: string, filter: FilterType) => {
        // через map
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, filter} : t))

        // через find
        // const todolist = todolists.find(t => t.id === todolistId)
        //  if (todolist) {
        //      todolist.filter = filter
        //      setTodolists([...todolists])
        //  }
    }
    const changeTaskStatus = (todolistId: string, taskId: string, taskStatus: boolean) => {
        // через map
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: taskStatus} : t)})

        // через find
        // const todolistTasks = tasks[todolistId]
        // const todolistTask = todolistTasks.find(t => t.id === taskId)
        // if (todolistTask) {
        //     todolistTask.isDone = taskStatus
        //     setTasks({...tasks})
        // }
    }
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, title: title} : el)})
    }

    return (
        <div className="App">
            <AddItemForm  addTask={addTodolist}/>
            {
                todolists.map(todolist => {

                    let filteredTasks = tasks[todolist.id]

                    if (todolist.filter === 'active') {
                        filteredTasks = filteredTasks.filter(el => !el.isDone)
                    }
                    if (todolist.filter === 'completed') {
                        filteredTasks = filteredTasks.filter(el => el.isDone)
                    }

                    return (
                        <Todolist key={todolist.id}
                                  id={todolist.id}
                                  title={todolist.title}
                                  tasks={filteredTasks}
                                  removeTodolist={removeTodolist}
                                  changeTodolistTitle={changeTodolistTitle}
                                  removeTask={removeTask}
                                  changeFilter={changeFilter}
                                  addTask={addTask}
                                  changeTaskStatus={changeTaskStatus}
                                  changeTaskTitle={changeTaskTitle}
                                  filter={todolist.filter}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
