import React from 'react';

import './App.css';

import {TaskType, Todolist} from './components/Todolist';

const App: React.FC = () => {
    const tasks1: Array<TaskType> = [
        {id: 1, title: 'CSS&HTML', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false}
    ]

    const tasks2: Array<TaskType> = [
        {id: 1, title: 'Avatar', isDone: true},
        {id: 2, title: 'Avengers', isDone: true},
        {id: 3, title: 'Iron Man', isDone: true}
    ]

    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasks1}/>
            <Todolist title="Films" tasks={tasks2}/>
        </div>
    );
}

export default App;
