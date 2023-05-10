import React, {useState} from "react";
import {Provider} from "react-redux";
import {v1} from "uuid";
import {combineReducers, createStore, legacy_createStore} from "redux";
import {tasksReducer} from "../reducers/task-reducer";
import {todolistsReducer} from "../reducers/todolists-reducer";
import {AppRootStateType} from "../reducers/store";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
})

// BLL
const todoListId_1 = v1();
const todoListId_2 = v1();

const initialGlobalState = {
    todolists: [
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        [todoListId_1]: [
            {id: v1(), title: 'HTML & CSS', isDone: true},
            {id: v1(), title: 'JavaScript & TypeScript', isDone: true},
            {id: v1(), title: 'React & Reduce', isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Meat', isDone: false},
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}> {storyFn()} </Provider>
}