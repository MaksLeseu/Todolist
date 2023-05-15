import React, {ChangeEvent, memo, useCallback} from "react";
import './App.css'
import {SuperButton} from "./SuperButton";
import {EditableSpan} from "./EditableSpan";
import {Checkbox, List, ListItem} from "@mui/material";
import {TaskType} from "./TodolistCopy";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC} from "./reducers/task-reducer";
import {SuperButtonWithRedux} from "./SuperButtonWithRedux";

type TasksListWithReduxPropsType = {
    task: TaskType
    todoListId: string
}

export const TasksListWithRedux = memo((props: TasksListWithReduxPropsType) => {
    const dispatch = useDispatch()

    const taskClasses = props.task.isDone ? 'task-done' : 'task';

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.task.id, e.currentTarget.checked, props.todoListId))
    }
    const changeTitle = useCallback((title: string) => {
        dispatch(changeTaskTitleAC(props.task.id, title, props.todoListId))
    }, [dispatch, props.task.id, props.todoListId])


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
                        <SuperButtonWithRedux id={props.task.id} todoListId={props.todoListId}/>
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