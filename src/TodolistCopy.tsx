import React, {useCallback, memo} from 'react';
import {filterValueType} from "./App";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";
import {TasksListCopy} from "./TasksListCopy";

type TodoListCopyPropsType = {
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

const TodolistCopy = memo((props: TodoListCopyPropsType) => {

    let tasks = props.tasks

    const handlerCreator = (filter: filterValueType) => {
        return () => props.changeTdoListFilter(filter, props.todoListId);
    }

    const removeTodoList = () => props.removeTodoList(props.todoListId);

    const addNewItem = useCallback((title: string) => {
        props.addTasks(title, props.todoListId)
    }, [props.addTasks, props.todoListId])

    const changeTitle = (title: string) => {
        props.changeTodolistTitle(title, props.todoListId)
    }

    if (props.filter === 'active') tasks = tasks.filter(t => !t.isDone);
    if (props.filter === 'completed') tasks = tasks.filter(t => t.isDone);

    return (
        <div className={'todolist'}>
            <h3 className={'title'}>{<EditableSpan title={props.title} changeTitle={changeTitle} />}</h3>
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
                {
                    tasks.length ? tasks.map(task => <TasksListCopy
                        task={task}
                        todoListId={props.todoListId}
                        removeTask={props.removeTasks}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}/>)
                        : <span>The list is empty!</span>
                }
            </ul>
            <div className={'filter-btn__container'}>
                <Button
                    size={'small'}
                    variant="contained"
                    disableElevation
                    color={props.filter === 'all' ? 'secondary': 'primary'}
                    onClick={handlerCreator('all')}
                >
                    All
                </Button>

                <Button
                    size={'small'}
                    variant="contained"
                    disableElevation
                    color={props.filter === 'active' ? 'secondary': 'primary'}
                    onClick={handlerCreator('active')}
                >
                    Active
                </Button>

                <Button
                    size={'small'}
                    variant="contained"
                    disableElevation
                    color={props.filter === 'completed' ? 'secondary': 'primary'}
                    onClick={handlerCreator('completed')}
                >
                    Completed
                </Button>
            </div>
        </div>
    );
});

export default TasksListCopy;

