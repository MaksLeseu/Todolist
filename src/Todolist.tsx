import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {TasksList} from "./TasksList";
import {filterValueType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    changeFilterValue: (filter: filterValueType) => void;
    removeTasks: (taskId: string) => void
    setTasks: any
    addTasks: any
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const Todolist = (props: TodoListPropsType) => {

    let [title, setTitle] = useState('');


    function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        setTitle(event.currentTarget.value);
    }

    function onKeyPressHandler(e: KeyboardEvent<HTMLInputElement>) {
        if (e.charCode === 13 && title.trim().length !== 0 && title.length < 20
        ) {
            props.addTasks(title);
            setTitle('');
        }
    }

    function onClockHandler() {
        props.addTasks(title);
        setTitle('');
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler} />
                <button disabled={title.trim().length === 0 || title.length > 20} onClick={onClockHandler}>+</button>
                {title.length > 20 && <div> Task title is to long!</div>}
            </div>
            <ul className={'pad'}>
                <TasksList removeTask={props.removeTasks} tasks={props.tasks} />
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