import React from "react";
import AddItemForm from "./AddItemForm";
import {action} from '@storybook/addon-actions'

export default {
    title: 'Item form',
    component: AddItemForm,
}

const callback = action('Action:')

export const AddItemFormBaseExample = (props: any) => {
    return <AddItemForm maxLengthUserMessage={20} addNewItem={callback} />
}


