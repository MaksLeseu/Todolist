import React from "react";
import {TaskType} from "./Todolist";
import './App.css'
import {SuperButton} from "./SuperButton";

type TasksListType = {
    tasks: TaskType[]
    removeTask: (taskId: string) => void
}




export function TasksList(props: TasksListType) {

    const TasksItem = props.tasks.length
    ? props.tasks.map(task => {
        return (
            <li key={task.id}>
                <input type={"checkbox"} checked={task.isDone}></input>
                <span className={'text'}>{task.title}</span>
                {/*<button onClick={() => props.removeTask(task.id)}>x</button>*/}
                <SuperButton name={'x'} removeTask={props.removeTask} id={task.id}/>
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