import React, {useState} from 'react';

import './App.css';

import {TaskType, Todolist} from './components/Todolist';

// function useState2(data: any) {
//     return [data, () => {}]
// }
//
// let arr = useState2([{},{},{}])
// let tasks =  arr[0]   // таски
// let setTasks = arr[1] // функция

// export function Counter() {
//     console.log("Counter rendered")
//     let arr = useState(5)
//     let data = arr[0]
//     let setData = arr[1]
//
//     return <div onClick={() => {setData(data + 1)}}>{data}</div>
// }

export type FilterType = 'all' | 'active' | 'completed'

const App = () => {
    const initialTasks = [
        {id: 1, title: 'CSS&HTML', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Redux', isDone: false}
    ]

    let [tasks, setTasks] = useState<TaskType[]>(initialTasks)
    let [filter, setFilter] = useState<FilterType>('all')

    const removeTask = (id: number) => {
        let filteredTasks = tasks.filter(el => el.id !== id)
        setTasks(filteredTasks)
    }

    const changeFilter = (filter: FilterType) => {
        setFilter(filter)
    }

    const getFilteredTasks = () => {
        let filteredTasks = tasks
        if (filter === 'active') {
            filteredTasks = tasks.filter(el => !el.isDone)
        }
        if (filter === 'completed') {
            filteredTasks = tasks.filter(el => el.isDone)
        }

        return filteredTasks
    }

    const filteredTasks = getFilteredTasks()

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={filteredTasks}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
