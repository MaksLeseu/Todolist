import React from "react";
import BackspaceIcon from '@mui/icons-material/Backspace';
import {IconButton} from "@mui/material";
import {useDispatch} from "react-redux";
import {removeTaskAC} from "./reducers/task-reducer";

type SuperButtonWithRedux = {
    id: string
    todoListId: string
}

export function SuperButtonWithRedux(props: SuperButtonWithRedux) {
    const dispatch = useDispatch()

    const removeTaskHandler = () => {
        /*props.removeTask(props.id, props.todoListId)*/
        dispatch(removeTaskAC(props.id, props.todoListId))
    }

    return (
        <>
            <IconButton
                size={'small'}
                onClick={removeTaskHandler}
            >
                <BackspaceIcon />
            </IconButton>
        </>
    )
}