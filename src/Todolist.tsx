import React from 'react';

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

const Todolist = (props: TodoListPropsType) => {

    const tasksItem: JSX.Element[] | JSX.Element = props.tasks.length
    ? props.tasks.map(task => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
            </li>
        )
        })
    : <span>Your luze</span>

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksItem}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};

export default Todolist;