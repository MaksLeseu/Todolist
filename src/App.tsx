import React from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";

function App() {
    const todoListTitle: string = 'What to learn';
    const tasks: Array<TaskType> = [
        {id: 1, title: 'HTML & CSS', isDone: true},
        {id: 2, title: 'JavaScript & TypeScript', isDone: true},
        {id: 3, title: 'React & Reduce', isDone: false}
    ]

    return (
        <div className="App">
            <Todolist title={todoListTitle} tasks={tasks} />
        </div>
    );
}

export default App;
