import React, {ChangeEvent} from "react";
import {TaskType} from "./Todolist";
import './App.css'
import {SuperButton} from "./SuperButton";

type TasksListType = {
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    setTasks: any
    changeTaskStatus: (taskId: string, newIsDone: boolean) => void
}


export function TasksList(props: TasksListType) {

    const TasksItem = props.tasks.length
    ? props.tasks.map(task => {

            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked);
            const taskClasses = task.isDone ? 'task-done': 'task';
        return (
            <li key={task.id}>
                <input onChange={changeTaskStatus} type={"checkbox"} checked={task.isDone}></input>
                <span className={taskClasses}>{task.title}</span>
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