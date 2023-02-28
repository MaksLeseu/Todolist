import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";
import {v1} from "uuid";

export type filterValueType = 'all'| 'active'| 'completed';

function App(): JSX.Element {
    const todoListTitle: string = 'What to learn';

    let [tasks, setTasks] = useState <Array<TaskType>>([
        {id: v1(), title: 'HTML & CSS', isDone: true},
        {id: v1(), title: 'JavaScript & TypeScript', isDone: true},
        {id: v1(), title: 'React & Reduce', isDone: false}
    ]);


    const [filter, setFilter] = useState <filterValueType>('all');

    const changeFilterValue = (filter: filterValueType) => setFilter(filter);

    function removeTasks(taskId: string) {
        const newTasks = tasks.filter(t => t.id !== taskId);
        setTasks(newTasks);
    }

    function addTasks(title: string) {
        setTasks([{id: v1(), title: title, isDone: false}, ...tasks]);
    }


    let filteredTasks: Array<TaskType> = [];

    if (filter === 'all') {
        filteredTasks = tasks;
    }

    if (filter === 'active') {
        filteredTasks = tasks.filter(t => t.isDone === false);
    }

    if (filter === 'completed') {
        filteredTasks = tasks.filter(t => t.isDone === true);
    }

    return (
        <div className="App">
            <Todolist
                title={todoListTitle}
                tasks={filteredTasks}
                changeFilterValue={changeFilterValue}
                removeTasks={removeTasks}
                setTasks={setTasks}
                addTasks={addTasks}
            />
        </div>
    );
}

export default App;
