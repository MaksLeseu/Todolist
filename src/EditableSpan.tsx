import React, {ChangeEvent, FC, memo, useState} from "react";

type EditableSpanPropsType = {
    title: string
    spanClasses?: string
    changeTitle: (title: string) => void
}

export const EditableSpan: FC<EditableSpanPropsType> = memo((
    {
        title,
        spanClasses,
        changeTitle
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
        changeTitle(localTitle)
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
})