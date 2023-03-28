import React, {ChangeEvent} from "react";
import {TaskType} from "./Todolist";
import './App.css'
import {SuperButton} from "./SuperButton";
import {EditableSpan} from "./EditableSpan";

type TasksListType = {
    todoListId: string
    tasks: TaskType[]
    removeTask: (taskId: string, todoListId: string) => void
    setTasks: any
    changeTaskStatus: (taskId: string, newIsDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
}


export function TasksList(props: TasksListType) {

    const TasksItem: JSX.Element[] | JSX.Element = props.tasks.length
    ? props.tasks.map(task => {

            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId);
            const taskClasses = task.isDone ? 'task-done': 'task';
            const changeTaskTitleHandler = (title: string) => {
                props.changeTaskTitle(task.id, title, props.todoListId)
            }
        return (
            <li key={task.id}>
                <input onChange={changeTaskStatus} type={"checkbox"} checked={task.isDone}></input>
                <EditableSpan title={task.title} spanClasses={taskClasses} changeTaskTitleHandler={changeTaskTitleHandler} />
                <SuperButton name={'x'} removeTask={props.removeTask} id={task.id} todoListId={props.todoListId} />
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