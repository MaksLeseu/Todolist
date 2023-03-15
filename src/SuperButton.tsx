import React from "react";

type SuperButtonPropsType = {
    name: string
    removeTask: (taskId: string, todoListId: string) => void
    id: string
    todoListId: string
}

export function SuperButton(props: SuperButtonPropsType) {

    return (
        <button onClick={() => props.removeTask(props.id, props.todoListId)} >{props.name}</button>
    )
}