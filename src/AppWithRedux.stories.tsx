import React from "react";
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./reducers/store";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";
import {Meta, StoryObj} from "@storybook/react";

/*export default {
    title: 'AppWithRedux Component',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator],
}

export const AppWithReduxBaseExample = () => {
    return (
        <AppWithRedux />
    )
}*/

const meta: Meta<typeof AppWithRedux> = {
    title: 'TODOLISTS/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator],
    tags: ['autodocs'],
}

type Story = StoryObj<typeof AppWithRedux>

export const AppWithReduxStory: Story = {

}

export default meta;
