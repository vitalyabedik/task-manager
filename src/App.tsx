import React, {useState} from 'react';

import './App.css';

import {TaskType, Todolist} from './components/Todolist';
import {v1} from 'uuid';

export type FilterType = 'all' | 'active' | 'completed'

const App = () => {
    const initialTasks = [
        {id: v1(), title: 'CSS&HTML', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false}
    ]

    let [tasks, setTasks] = useState<TaskType[]>(initialTasks)
    let [filter, setFilter] = useState<FilterType>('all')

    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter(el => el.id !== id)
        setTasks(filteredTasks)
    }

    const addTask = (title: string) => {
        const newTask = {
            id: v1(),
            title,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    const changeFilter = (filter: FilterType) => {
        setFilter(filter)
    }

    let filteredTasks = tasks
    if (filter === 'active') {
        filteredTasks = tasks.filter(el => !el.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(el => el.isDone)
    }


    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={filteredTasks}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
