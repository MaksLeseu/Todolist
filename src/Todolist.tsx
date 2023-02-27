import React, {ChangeEvent, useState} from 'react';
import {TasksList} from "./TasksList";
import {filterValueType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    changeFilterValue: (filter: filterValueType) => void;
    removeTasks: (taskId: number) => void
    setTasks: any
    addTasks: any
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

const Todolist = (props: TodoListPropsType) => {

    let [title, setTitle] = useState('');


    function InputValue(event: ChangeEvent<HTMLInputElement>) {
        setTitle(event.currentTarget.value);
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={InputValue}/>
                <button onClick={() => {
                    props.addTasks(title);
                    setTitle('');
                }}>+</button>
            </div>
            <ul className={'pad'}>
                <TasksList removeTask={props.removeTasks} tasks={props.tasks}/>
            </ul>
            <div>
                <button onClick={() => props.changeFilterValue('all')}>All</button>
                <button onClick={() => props.changeFilterValue('active')}>Active</button>
                <button onClick={() => props.changeFilterValue('completed')}>Completed</button>
            </div>
        </div>
    );
};

export default Todolist;