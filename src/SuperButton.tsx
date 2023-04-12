import React from "react";
import BackspaceIcon from '@mui/icons-material/Backspace';
import {IconButton} from "@mui/material";

type SuperButtonPropsType = {
    name: string
    removeTask: (taskId: string, todoListId: string) => void
    id: string
    todoListId: string
}

export function SuperButton(props: SuperButtonPropsType) {

    const removeTaskHandler = () => {
        props.removeTask(props.id, props.todoListId)
    }

    return (
        <>
            {/*<button onClick={() => props.removeTask(props.id, props.todoListId)} >{props.name}</button>*/}
            <IconButton
                size={'small'}
                onClick={removeTaskHandler}
            >
                <BackspaceIcon />
            </IconButton>
        </>
    )
}