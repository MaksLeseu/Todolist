import React, {useCallback, memo} from 'react';
import {filterValueType} from "./App";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";
import {TasksListWithRedux} from "./TasksListWithRedux";

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

const Todolist = memo((props: TodoListPropsType) => {
    let tasks = props.tasks

    const onAllClickHandler = useCallback(() => props.changeTdoListFilter('all', props.todoListId), [props.changeTdoListFilter, props.todoListId])
    const onActiveClickHandler = useCallback(() => props.changeTdoListFilter('active', props.todoListId), [props.changeTdoListFilter, props.todoListId])
    const onCompletedClickHandler = useCallback(() => props.changeTdoListFilter('completed', props.todoListId), [props.changeTdoListFilter, props.todoListId])

    /*const handlerCreator = (filter: filterValueType) => {              !!! Общая функция для фильтрации тасок !!!
        return () => props.changeTdoListFilter(filter, props.todoListId);
    }*/

    const removeTodoList = () => props.removeTodoList(props.todoListId);

    const addNewItem = useCallback((title: string) => {
        props.addTasks(title, props.todoListId)
    }, [props.addTasks, props.todoListId])

    const changeTitle = useCallback((title: string) => {
        props.changeTodolistTitle(title, props.todoListId)
    }, [props.changeTodolistTitle, props.todoListId])



    /*const removeTasks = useCallback((taskId: string, todolistId: string) => {
        props.removeTasks(taskId, props.todoListId)
    }, [props.removeTasks, props.todoListId])

    const changeTaskStatus = useCallback((taskId: string, newIsDone: boolean, todoListId: string) => {
        props.changeTaskStatus(taskId, newIsDone, props.todoListId);
    }, [props.changeTaskStatus, props.todoListId])

    const changeTitleTask = useCallback((taskId: string, title: string, todoListId: string) => {
        props.changeTaskTitle(taskId, title, props.todoListId)
    }, [props.changeTaskTitle, props.todoListId])*/



    /*tasks = useMemo(() => {
        if (props.filter === 'active') {
            tasks = tasks.filter(t => !t.isDone)
        }
        if (props.filter === 'completed') {
            tasks = tasks.filter(t => t.isDone)
        }
        return tasks
    }, [props.filter])*/

    if (props.filter === 'active') {
        tasks = tasks.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        tasks = tasks.filter(t => t.isDone)
    }

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
                {/*<TasksList
                    todoListId={props.todoListId}
                    setTasks={props.setTasks}
                    removeTask={props.removeTasks}
                    tasks={tasks}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                />*/}
                {/*{
                    tasks.length ? tasks.map(task => <TasksListCopy
                            key={task.id}
                            task={task}
                            todoListId={props.todoListId}
                            removeTask={removeTasks}
                            changeTaskStatus={changeTaskStatus}
                            changeTaskTitle={changeTitleTask}/>)
                        : <span>The list is empty!</span>
                }*/}
                {
                    tasks.length ? tasks.map(task => <TasksListWithRedux
                            key={task.id}
                            task={task}
                            todoListId={props.todoListId}/>)
                        : <span>The list is empty!</span>
                }
            </ul>
            <div className={'filter-btn__container'}>

                <ButtonWithMemo
                    title={'All'}
                    size={'small'}
                    variant="contained"
                    color={props.filter === 'all' ? 'secondary': 'primary'}
                    onClick={onAllClickHandler}
                />

                <ButtonWithMemo
                    title={'Active'}
                    size={'small'}
                    variant="contained"
                    color={props.filter === 'active' ? 'secondary': 'primary'}
                    onClick={onActiveClickHandler}
                />

                <ButtonWithMemo
                    title={'Completed'}
                    size={'small'}
                    variant="contained"
                    color={props.filter === 'completed' ? 'secondary': 'primary'}
                    onClick={onCompletedClickHandler}
                />
                {/*<Button
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
                </Button>*/}
            </div>
        </div>
    );
});

export default Todolist;

type ButtonWithMemoPropsType = {
    title: string
    size: 'small' | 'medium' | 'large'
    variant: "text" | "outlined" | "contained"
    color:  "inherit" | "secondary" | "primary" | "error" | "info" | "success" | "warning"
    onClick: any
}

const ButtonWithMemo = memo((props: ButtonWithMemoPropsType) => {
    return (
        <Button
            size={props.size}
            variant={props.variant}
            disableElevation
            color={props.color}
            onClick={props.onClick}
        >
            {props.title}
        </Button>
    )
})