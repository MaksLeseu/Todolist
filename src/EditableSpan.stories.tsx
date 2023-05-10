import React from "react";
import {EditableSpan} from "./EditableSpan";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Editable span',
    component: EditableSpan,
}

const changeTitleCallback = action('Task title has been changed')

export const EditableSpanBaseExample = () => {
    return (
        <EditableSpan title={'Start value'} changeTitle={changeTitleCallback} />
    )
}
