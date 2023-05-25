import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import AddItemForm from "./AddItemForm";
import {action} from '@storybook/addon-actions'
import {Meta, StoryObj} from "@storybook/react";
import {IconButton, TextField} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
    tags: ['autodocs'],
    argTypes: {
        addNewItem: {
            description: 'Button clicked inside form',
            action: 'clicked',
        }
    }
}

type Story = StoryObj<typeof AddItemForm>

export const AddItemFormStory: Story = {

}

export const AddItemFormStoryExampleTwo = (props: any) => {
    let [title, setTitle] = useState('');
    let [error, setError] = useState<boolean>(true);
    const isUserMessageToLong = title.length > props.maxLengthUserMessage;

    const inputErrorClasses = error || title.length > props.maxLengthUserMessage ? 'input-error': '';
    const userMaxLengthMessage = isUserMessageToLong && <div style={{color: 'hotpink'}}> Task title is to long!</div>;
    const userErrorMessage = error && <div style={{color: 'hotpink'}}> Title is required!</div>;
    const isAddBtnDisabled = title.length === 0 || isUserMessageToLong || error;

    const changeLocalTitle = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(false);
        setTitle(event.currentTarget.value);
    }

    const onKeyDownAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        return e.key === 'Enter' && title.length < props.maxLengthUserMessage && addItem();
    }

    const addItem = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle) {
            props.addNewItem(title);
        } else {
            setError(true);
        }
        setTitle('');
    }

    return (
        <div>
            <TextField
                size={'small'}
                value={title}
                placeholder={'Please enter title.'}
                onChange={changeLocalTitle}
                onKeyDown={onKeyDownAddItem}
                className={inputErrorClasses}
            />
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

export default meta

/*export default {
    title: 'Item form',
    component: AddItemForm,
    tags: ['autodocs'],
    argTypes: {
        addItem: {
            description: 'Button clicked inside form',
            action: 'clicked'
        }
    }
}*/
/*const callback = action('Action:')*/
/*export const AddItemFormBaseExample = (props: any) => {
    return <AddItemForm maxLengthUserMessage={20} addNewItem={callback} />
}*/




