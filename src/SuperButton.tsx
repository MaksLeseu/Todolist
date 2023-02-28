import React from "react";

type SuperButtonPropsType = {
    name: string
    removeTask: (taskId: string) => void
    id: string
}

export function SuperButton(props: SuperButtonPropsType) {

    return (
        <button onClick={() => props.removeTask(props.id)} >{props.name}</button>
    )
}