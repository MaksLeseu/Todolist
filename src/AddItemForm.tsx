import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {IconButton, TextField} from "@mui/material";

type AddItemFormType = {
    maxLengthUserMessage: number
    addNewItem: (title: string) => void

}

const AddItemForm: FC<AddItemFormType> = (
    {
        maxLengthUserMessage,
        addNewItem,
    }
) => {

    let [title, setTitle] = useState('');
    let [error, setError] = useState<boolean>(false);
    const isUserMessageToLong = title.length > maxLengthUserMessage;

    const inputErrorClasses = error || title.length > maxLengthUserMessage ? 'input-error': '';
    const userMaxLengthMessage = isUserMessageToLong && <div style={{color: 'hotpink'}}> Task title is to long!</div>;
    const userErrorMessage = error && <div style={{color: 'hotpink'}}> Title is required!</div>;
    const isAddBtnDisabled = title.length === 0 || isUserMessageToLong || error;

    const changeLocalTitle = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(false);
        setTitle(event.currentTarget.value);
    }

    const onKeyDownAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        return e.key === 'Enter' && title.length < maxLengthUserMessage && addItem();
    }

    const addItem = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle) {
            addNewItem(title);
        } else {
            setError(true);
        }
        setTitle('');
    }

    return (
        <div>
            {/*<input value={title}
                   placeholder={'Please enter title.'}
                   onChange={changeLocalTitle}
                   onKeyDown={onKeyDownAddItem}
                   className={inputErrorClasses}
            />*/}
            <TextField
                size={'small'}
                value={title}
                placeholder={'Please enter title.'}
                onChange={changeLocalTitle}
                onKeyDown={onKeyDownAddItem}
                className={inputErrorClasses}
            />

            {/*<button disabled={isAddBtnDisabled} onClick={addItem}>+</button>*/}
            <IconButton
                color={'primary'}
                disabled={isAddBtnDisabled}
                onClick={addItem}
            >
                <AddCircleIcon />
            </IconButton>
            {userMaxLengthMessage}
            {userErrorMessage}
        </div>
    )
}

export default AddItemForm;