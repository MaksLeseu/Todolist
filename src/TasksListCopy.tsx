import React, {ChangeEvent, memo, useCallback} from "react";
import './App.css'
import {SuperButton} from "./SuperButton";
import {EditableSpan} from "./EditableSpan";
import {Checkbox, List, ListItem} from "@mui/material";
import {TaskType} from "./TodolistCopy";

type TaskListType = {
    task: TaskType
    removeTask: (taskId: string, todoListId: string) => void
    todoListId: string
    changeTaskStatus: (taskId: string, newIsDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
}

export const TasksListCopy = memo((props: TaskListType) => {

    const taskClasses = props.task.isDone ? 'task-done' : 'task';

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todoListId);
    }
    const changeTitle = useCallback((title: string) => {
        props.changeTaskTitle(props.task.id, title, props.todoListId)
    }, [props.changeTaskTitle, props.todoListId])

        return (
            <List
                disablePadding={false}
            >
                <ListItem
                    disablePadding={true}
                    disableGutters
                    divider
                    key={props.task.id}
                    secondaryAction={
                        <SuperButton name={'x'} removeTask={props.removeTask} id={props.task.id}
                                     todoListId={props.todoListId}/>
                    }
                >
                    <Checkbox
                        size={'small'}
                        onChange={changeTaskStatus}
                        checked={props.task.isDone}
                    ></Checkbox>
                    <EditableSpan title={props.task.title} spanClasses={taskClasses} changeTitle={changeTitle}/>
                </ListItem>
            </List>
        )
})