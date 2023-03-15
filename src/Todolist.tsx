import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {TasksList} from "./TasksList";
import {filterValueType} from "./App";

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
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const Todolist = (props: TodoListPropsType) => {

    let [title, setTitle] = useState('');
    let [error, setError] = useState<boolean>(false);
    const maxLengthUserMessage: number = 20;
    const isUserMessageToLong = title.length > maxLengthUserMessage;

    const inputErrorClasses = error || title.length > maxLengthUserMessage ? 'input-error': '';
    const userMaxLengthMessage = isUserMessageToLong && <div style={{color: 'hotpink'}}> Task title is to long!</div>;
    const userErrorMessage = error && <div style={{color: 'hotpink'}}> Title is required!</div>;
    const isAddBtnDisabled = title.length === 0 || isUserMessageToLong;


    const changeLocalTitle = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(false);
        setTitle(event.currentTarget.value);
    }

    const addTasks = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle) {
            props.addTasks(title, props.todoListId);
        } else {
            setError(true);
        }
        setTitle('');
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        return e.key === 'Enter' && title.length < maxLengthUserMessage && addTasks();
    }

    const handlerCreator = (filter: filterValueType) => {
        return () => props.changeTdoListFilter(filter, props.todoListId);
    }

    const removeTodoList = () => props.removeTodoList(props.todoListId);

    return (
        <div className={'todolist'}>
            <h3>{props.title}</h3>
            <button onClick={removeTodoList}>xX</button>
            <div>
                <input value={title}
                       placeholder={'Please enter title.'}
                       onChange={changeLocalTitle}
                       onKeyDown={onKeyDownHandler}
                       className={inputErrorClasses}
                />

                <button disabled={isAddBtnDisabled} onClick={addTasks}>+</button>
                {userMaxLengthMessage}
                {userErrorMessage}

            </div>
            <ul className={'pad'}>
                <TasksList
                    todoListId={props.todoListId}
                    setTasks={props.setTasks}
                    removeTask={props.removeTasks}
                    tasks={props.tasks}
                    changeTaskStatus={props.changeTaskStatus}
                />
            </ul>
            <div className={'filter-btn__container'}>
                <button className={props.filter === 'all' ? 'filter-btn__active': 'filter-btn'}
                        onClick={handlerCreator('all')}>All</button>
                <button className={props.filter === 'active' ? 'filter-btn__active': 'filter-btn'}
                        onClick={handlerCreator('active')}>Active</button>
                <button className={props.filter === 'completed' ? 'filter-btn__active': 'filter-btn'}
                        onClick={handlerCreator('completed')}>Completed</button>
            </div>
        </div>
    );
};

export default Todolist;