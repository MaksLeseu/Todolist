import React, {ChangeEvent} from "react";
import {TaskType} from "./Todolist";
import './App.css'
import {SuperButton} from "./SuperButton";
import {EditableSpan} from "./EditableSpan";
import {Checkbox, List, ListItem} from "@mui/material";

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
            const changeTitle = (title: string) => {
                props.changeTaskTitle(task.id, title, props.todoListId)
            }
        return (
            <ListItem
                disablePadding={true}
                disableGutters
                divider
                key={task.id}
                secondaryAction={
                    <SuperButton name={'x'} removeTask={props.removeTask} id={task.id} todoListId={props.todoListId} />
                }
            >
                <Checkbox
                    size={'small'}
                    onChange={changeTaskStatus}
                    checked={task.isDone}
                ></Checkbox>
                <EditableSpan title={task.title} spanClasses={taskClasses} changeTitle={changeTitle} />
            </ListItem>
        )
        })
    : <span>The list is empty!</span>

    return (
        <List
            disablePadding={false}
        >
            {TasksItem}
        </List>
    )
}