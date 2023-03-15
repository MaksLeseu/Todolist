import React, {ChangeEvent} from "react";
import {TaskType} from "./Todolist";
import './App.css'
import {SuperButton} from "./SuperButton";

type TasksListType = {
    todoListId: string
    tasks: TaskType[]
    removeTask: (taskId: string, todoListId: string) => void
    setTasks: any
    changeTaskStatus: (taskId: string, newIsDone: boolean, todoListId: string) => void
}


export function TasksList(props: TasksListType) {

    const TasksItem: JSX.Element[] | JSX.Element = props.tasks.length
    ? props.tasks.map(task => {

            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId);
            const taskClasses = task.isDone ? 'task-done': 'task';
        return (
            <li key={task.id}>
                <input onChange={changeTaskStatus} type={"checkbox"} checked={task.isDone}></input>
                <span className={taskClasses}>{task.title}</span>
                <SuperButton name={'x'} removeTask={props.removeTask} id={task.id} todoListId={props.todoListId}/>
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