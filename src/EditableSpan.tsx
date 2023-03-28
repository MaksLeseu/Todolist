import React, {ChangeEvent, FC, useState} from "react";

type EditableSpanPropsType = {
    title: string
    spanClasses?: string
    changeTaskTitleHandler: (title: string) => void
}

export const EditableSpan: FC<EditableSpanPropsType> = (
    {
        title,
        spanClasses,
        changeTaskTitleHandler
    }
) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [localTitle, setLocalTitle] = useState<string>(title)

    const changeLocalTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setLocalTitle(event.currentTarget.value);
    }

    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        changeTaskTitleHandler(localTitle)
    }

    return (
        editMode ? <input
            value={localTitle}
            onChange={changeLocalTitle}
            autoFocus
            onBlur={offEditMode}
        /> : <span
            className={spanClasses}
            onDoubleClick={onEditMode}
        >{title}</span>
    )
}