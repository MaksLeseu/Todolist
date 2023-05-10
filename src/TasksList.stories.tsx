import React, {useState} from "react";
import {TasksList} from "./TasksList";
import {action} from "@storybook/addon-actions";
import {v1} from "uuid";

export default {
    title: 'Tasks',
    components: TasksList,
}

type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export const TaskListFullFunctionality = (props: any) => {
    const [tasks, setTasks] = useState<TasksType[]>([{id: v1(), title: 'JavaScript', isDone: false}, {id: v1(), title: 'React', isDone: false}])

    const removeTasks = (taskId: string, todolistId: string): void => {
        setTasks(tasks.filter(t => t.id !== taskId ? t : null))
    }
    const changeTaskStatus = (taskId: string, newIsDone: boolean, todolistId: string): void => {
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: newIsDone} : t))
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string): void => {
        setTasks(tasks.map(t => t.id === taskId ? {...t, title: newTitle} : t))
    }

    return (
        <TasksList
            todoListId={props.todoListId}
            tasks={tasks}
            removeTask={removeTasks}
            setTasks={props.setTasks}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
        />
    )
}

const removeTaskCallback = action('Task has been removed')
const setTasksCallback = action('set Task Callback work')
const changeTaskStatusCallback = action('Task status has been changed')
const changeTaskTitleCallback = action('Task title has been changed')

export const TaskBaseExample = () => {
    return (
        <>
            <TasksList
                todoListId={'todolistId1'}
                tasks={[{id: '1', title: 'JavaScript', isDone: true}]}
                removeTask={removeTaskCallback}
                setTasks={setTasksCallback}
                changeTaskStatus={changeTaskStatusCallback}
                changeTaskTitle={changeTaskTitleCallback} />
            <TasksList
                todoListId={'todolistId2'}
                tasks={[{id: '2', title: 'React', isDone: false}]}
                removeTask={removeTaskCallback}
                setTasks={setTasksCallback}
                changeTaskStatus={changeTaskStatusCallback}
                changeTaskTitle={changeTaskTitleCallback} />
        </>
    )
}
