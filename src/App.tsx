import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";

export type filterValueType = 'all'| 'active'| 'completed';

function App(): JSX.Element {
    const todoListTitle: string = 'What to learn';

    const [tasks, setTasks] = useState <Array<TaskType>>([
        {id: 1, title: 'HTML & CSS', isDone: true},
        {id: 2, title: 'JavaScript & TypeScript', isDone: true},
        {id: 3, title: 'React & Reduce', isDone: false}
    ]);

    const [filter, setFilter] = useState <filterValueType>('all');

    const changeFilterValue = (filter: filterValueType) => setFilter(filter);

    function removeTasks(taskId: number) {
        const newTasks = tasks.filter(t => t.id !== taskId);
        setTasks(newTasks);
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
            />
        </div>
    );
}

export default App;
