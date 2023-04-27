import React from "react";
import {filterValueType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveActionTodolistType = ReturnType<typeof removeTodolistActionCreator>
export type AddTodolistActionType = ReturnType<typeof addTodolistActionCreator>
type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleActionCreator>

export type ActionValueType = RemoveActionTodolistType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType


export type TodolistsReducerType = (todoList: TodoListType[], action: ActionValueType) => TodoListType[]

export const todolistsReducer: TodolistsReducerType = (todoList, action) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoList.filter(tl => tl.id !== action.id)

        case 'ADD-TODOLIST':
            const newTodoList = {id: action.todolistId, title: action.title,}
            return [...todoList, newTodoList]

        case 'CHANGE-TODOLIST-TITLE':
            return todoList.map(tl => tl.id === action.id ? {...tl, title: action.newTitle} : tl)

        default: return todoList
    }
}

export const removeTodolistActionCreator = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistActionCreator = (title: string) => ({type: 'ADD-TODOLIST', title, todolistId: v1()} as const)
export const changeTodolistTitleActionCreator = (id: string, newTitle: string) => ({type: "CHANGE-TODOLIST-TITLE", id, newTitle} as const)

