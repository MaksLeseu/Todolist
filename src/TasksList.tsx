import React from "react";
import {TaskType} from "./Todolist";
import './App.css'

type TasksListType = {
    tasks: TaskType[]
    removeTask: (taskId: number) => void
}




export function TasksList(props: TasksListType) {

    function buttonWork() {
        alert('Button Work!');
    }

    const TasksItem = props.tasks.length
    ? props.tasks.map(task => {
        return (
            <li key={task.id}>
                <input type={"checkbox"} checked={task.isDone}></input>
                <span className={'text'}>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}>x</button>
            </li>
        )
        })
    : <span>The list is empty!</span>

    return (
        <ul>
            {TasksItem}
        </ul>
    )
}