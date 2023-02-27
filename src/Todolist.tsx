import React, {ChangeEvent} from 'react';
import {TasksList} from "./TasksList";
import {filterValueType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    changeFilterValue: (filter: filterValueType) => void;
    removeTasks: (taskId: number) => void
    setTasks: any
    addTasks: () => void
    setTitle: any
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

const Todolist = (props: TodoListPropsType) => {

    function InputValue(event: ChangeEvent<HTMLInputElement>) {
        props.setTitle(event.currentTarget.value);
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input onChange={InputValue}/>
                <button onClick={props.addTasks}>+</button>
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