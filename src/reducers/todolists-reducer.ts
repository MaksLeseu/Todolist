import React from "react";
import {v1} from "uuid";
import {TodoListType} from "../AppWithReducers";

export type RemoveActionTodolistType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

export type ActionsTodolistType = RemoveActionTodolistType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType


let initialState: TodoListType[] = [];

export const todolistsReducer = (todoList = initialState, action: ActionsTodolistType): any => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoList.filter(tl => tl.id !== action.id)

        case 'ADD-TODOLIST':
            const newTodoList = {id: action.todolistId, title: action.title, filter: 'all'}
            return [...todoList, newTodoList]

        case 'CHANGE-TODOLIST-TITLE':
            return todoList.map(tl => tl.id === action.id ? {...tl, title: action.newTitle} : tl)

        case 'CHANGE-TODOLIST-FILTER':
            return todoList.map(tl => tl.id === action.id ? {...tl, filter: action.newFilter}: tl)

        default: return todoList
    }
}

export const removeTodolistAC = (id: string) => {
    return  {type: 'REMOVE-TODOLIST', id} as const
}
export const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()} as const
}
export const changeTodolistTitleAC = (id: string, newTitle: string) => {
    return {type: "CHANGE-TODOLIST-TITLE", id, newTitle} as const
}
export const changeTodolistFilterAC = (id: string, newFilter: string) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, newFilter} as const
}

