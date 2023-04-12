import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {TasksList} from "./TasksList";
import {filterValueType} from "./App";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";

type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: TaskType[]
    filter: string
    setTasks: any
    changeTdoListFilter: (filter: filterValueType, todoListId: string) => void;
    removeTasks: (taskId: string, todoListId: string) => void
    addTasks: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    changeTodolistTitle: (newTitle: string, todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const Todolist = (props: TodoListPropsType) => {

    const handlerCreator = (filter: filterValueType) => {
        return () => props.changeTdoListFilter(filter, props.todoListId);
    }

    const removeTodoList = () => props.removeTodoList(props.todoListId);

    const addNewItem = (title: string) => {
        props.addTasks(title, props.todoListId)
    }

    const changeTitle = (title: string) => {
        props.changeTodolistTitle(title, props.todoListId)
    }

    return (
        <div className={'todolist'}>
            <h3 className={'title'}>{<EditableSpan title={props.title} changeTitle={changeTitle} />}</h3>
            {/*<button onClick={removeTodoList}>xX</button>*/}
            <IconButton
                color={'secondary'}
                onClick={removeTodoList}
            >
                <BackspaceIcon />
            </IconButton>

            <AddItemForm
                maxLengthUserMessage={15}
                addNewItem={addNewItem}
            />
            <ul className={'pad'}>
                <TasksList
                    todoListId={props.todoListId}
                    setTasks={props.setTasks}
                    removeTask={props.removeTasks}
                    tasks={props.tasks}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                />
            </ul>
            <div className={'filter-btn__container'}>
                <Button
                    size={'small'}
                    variant="contained"
                    disableElevation
                    color={props.filter === 'all' ? 'secondary': 'primary'}
                    /*className={props.filter === 'all' ? 'filter-btn__active': 'filter-btn'}*/
                    onClick={handlerCreator('all')}
                >
                    All
                </Button>

                <Button
                    size={'small'}
                    variant="contained"
                    disableElevation
                    color={props.filter === 'active' ? 'secondary': 'primary'}
                    /*className={props.filter === 'active' ? 'filter-btn__active': 'filter-btn'}*/
                    onClick={handlerCreator('active')}
                >
                    Active
                </Button>

                <Button
                    size={'small'}
                    variant="contained"
                    disableElevation
                    color={props.filter === 'completed' ? 'secondary': 'primary'}
                    /*className={props.filter === 'completed' ? 'filter-btn__active': 'filter-btn'}*/
                    onClick={handlerCreator('completed')}
                >
                    Completed
                </Button>
            </div>
        </div>
    );
};

export default Todolist;