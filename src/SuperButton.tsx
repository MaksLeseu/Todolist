import React from "react";

type SuperButtonPropsType = {
    name: string
    removeTask: (taskId: number) => void
    id: number
}

export function SuperButton(props: SuperButtonPropsType) {

    return (
        <button onClick={() => props.removeTask(props.id)} >{props.name}</button>
    )
}