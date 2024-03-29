import React, {ChangeEvent, useState} from "react";
import {EditableSpan} from "./EditableSpan";
import {action} from "@storybook/addon-actions";
import {Meta, StoryObj} from "@storybook/react";
import AddItemForm from "./AddItemForm";

/*export default {
    title: 'Editable span',
    component: EditableSpan,
}

const changeTitleCallback = action('Task title has been changed')

export const EditableSpanBaseExample = () => {
    return (
        <EditableSpan title={'Start value'} changeTitle={changeTitleCallback} />
    )
}*/


const meta: Meta<typeof EditableSpan> = {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    tags: ['autodocs'],
    argTypes: {
        changeTitle: {
            description: 'String',
            action: 'clicked'
        },
    }
}

type Story = StoryObj<typeof EditableSpan>

export const EditableSpanStory: Story = {
    args: {
        title: 'Test title - Click twice'
    }
}

export const EditableSpanStoryExampleTwo = (props: any) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [localTitle, setLocalTitle] = useState<string>('Test title')

    const changeLocalTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setLocalTitle(event.currentTarget.value);
    }

    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
            props.changeTitle(localTitle)
    }

    return (
        editMode ? <input
    value={localTitle}
    onChange={changeLocalTitle}
    autoFocus
    onBlur={offEditMode}
/> : <span
    className={props.spanClasses}
    onDoubleClick={onEditMode}
>{localTitle}</span>
)
}

export default meta;