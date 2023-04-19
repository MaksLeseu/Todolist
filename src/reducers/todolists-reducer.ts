import React from "react";
import {filterValueType, TodoListType} from "../App";
import {v1} from "uuid";

type ActionRemoveTodolistType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
type ActionAddTodolistType = {
    type: 'ADD-TODOLIST'
    title: string
}

type ActionChangeTodolistTitleType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    newTitle: string
}

export type ActionValueType =
    ActionRemoveTodolistType |
    ActionAddTodolistType |
    ActionChangeTodolistTitleType


export type TodolistsReducerType = (todoList: TodoListType[], action: ActionValueType) => TodoListType[]

export const todolistsReducer: TodolistsReducerType = (todoList, action) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoList.filter(tl => tl.id !== action.id)

        case 'ADD-TODOLIST':
            const newTodoListId = v1();
            const newTodoList = {id: newTodoListId, title: action.title,}
            return [...todoList, newTodoList]

        case 'CHANGE-TODOLIST-TITLE':
            return todoList.map(tl => tl.id === action.id ? {...tl, title: action.newTitle} : tl)

        default: return todoList
    }
}

export const removeTodolistActionCreator = (id: string): ActionRemoveTodolistType => ({type: 'REMOVE-TODOLIST', id})
export const addTodolistActionCreator = (title: string): ActionAddTodolistType => ({type: 'ADD-TODOLIST', title})
export const changeTodolistTitleActionCreator = (id: string, newTitle: string): ActionChangeTodolistTitleType => ({type: "CHANGE-TODOLIST-TITLE", id, newTitle})

