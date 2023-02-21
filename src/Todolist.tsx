import React from 'react';
import {TasksList} from "./TasksList";
import {filterValueType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    changeFilterValue: (filter: filterValueType) => void;
    removeTasks: (taskId: number) => void
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

const Todolist = (props: TodoListPropsType) => {

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
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