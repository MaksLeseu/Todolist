import React from "react";
import {v1} from "uuid";
import {TodoListType} from "../AppWithReducers";
import {
    addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolists-reducer";

let todoListId_1: string
let todoListId_2: string
let todoList: TodoListType[]

beforeEach(() => {
    todoListId_1 = v1();
    todoListId_2 = v1();
    todoList = [
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ];
})

test('The correct todolist should be removed', () => {
    const endState = todolistsReducer(todoList, removeTodolistAC(todoListId_1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId_2)
})

test('The correct todolist should be updated and a new todolist added', () => {
    const title: string = 'New todolist'
    const updatedTodolist = todolistsReducer(todoList, addTodolistAC(title))

    expect(updatedTodolist.length).toBe(3)
    expect(updatedTodolist[2].title).toBe(title)
})

test('Title todolist should be changed', () => {
    const newTitle: string = 'Hy, my name is...'
    const newTodolist = todolistsReducer(todoList, changeTodolistTitleAC(todoListId_1, newTitle))

    expect(newTodolist.length).toBe(2)
    expect(newTodolist[0].id).toBe(todoListId_1)
    expect(newTodolist[0].title).toBe(newTitle)
})

test('Filter todolist should be changed', () => {
    const newFilter: string = 'active'
    const newTodolist = todolistsReducer(todoList, changeTodolistFilterAC(todoListId_1, newFilter))

    expect(newTodolist.length).toBe(2)
    expect(newTodolist[0].id).toBe(todoListId_1)
    expect(newTodolist[0].filter).toBe('active')
})
