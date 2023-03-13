import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";
import {v1} from "uuid";

export type filterValueType = 'all'| 'active'| 'completed';

type TodoListType = {
    id: string
    title: string
    filter: filterValueType
}

function App(): JSX.Element {

    // BLl
    const todoListTitle: string = 'What to learn';

    let [tasks, setTasks] = useState <Array<TaskType>>([
        {id: v1(), title: 'HTML & CSS', isDone: true},
        {id: v1(), title: 'JavaScript & TypeScript', isDone: true},
        {id: v1(), title: 'React & Reduce', isDone: false}
    ]);


    const [filter, setFilter] = useState <filterValueType>('all');
    const changeFilterValue = (filter: filterValueType) => setFilter(filter);

    let filteredTasks: Array<TaskType> = [];

    const getFilteredTasks = (tasks: Array<TaskType>, filter: filterValueType): Array<TaskType> => {
        switch (filter) {
            case "active":
                return filteredTasks = tasks.filter(t => t.isDone === false);
            case "completed":
                return filteredTasks = tasks.filter(t => t.isDone === true);
            default:
                return filteredTasks = tasks;
        }
    }
    getFilteredTasks(tasks, filter);

    function removeTasks(taskId: string) {
        const newTasks = tasks.filter(t => t.id !== taskId);
        setTasks(newTasks);
    }

    function addTasks(title: string) {
        setTasks([{id: v1(), title: title, isDone: false}, ...tasks]);
    }

    function changeTaskStatus(taskId: string, newIsDone: boolean) {
        setTasks(tasks.map(i => i.id === taskId ? {...i, isDone : newIsDone} : i));
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
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
