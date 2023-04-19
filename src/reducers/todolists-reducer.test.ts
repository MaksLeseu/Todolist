import React from "react";
import {v1} from "uuid";
import {TodoListType} from "../App";
import {
    addTodolistActionCreator,
    changeTodolistTitleActionCreator,
    removeTodolistActionCreator,
    todolistsReducer
} from "./todolists-reducer";

test('The correct todolist should be removed', () => {
    const todoListId_1 = v1();
    const todoListId_2 = v1();
    const todoList:TodoListType[] = [
        {id: todoListId_1, title: 'What to learn',},
        {id: todoListId_2, title: 'What to buy',}
    ];

    const endState = todolistsReducer(todoList, removeTodolistActionCreator(todoListId_1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId_2)
})

test('The correct todolist should be updated and a new todolist added', () => {
    const todoListId_1 = v1();
    const todoListId_2 = v1();
    const todoList:TodoListType[] = [
        {id: todoListId_1, title: 'What to learn',},
        {id: todoListId_2, title: 'What to buy',}
    ];
    const title: string = 'New todolist'
    const updatedTodolist = todolistsReducer(todoList, addTodolistActionCreator(title))

    expect(updatedTodolist.length).toBe(3)
    expect(updatedTodolist[2].title).toBe(title)
})

test('Title todolist should be changed', () => {
    const todoListId_1 = v1();
    const todoListId_2 = v1();
    const todoList:TodoListType[] = [
        {id: todoListId_1, title: 'What to learn',},
        {id: todoListId_2, title: 'What to buy',}
    ];
    const newTitle: string = 'Hy, my name is...'
    const newTodolist = todolistsReducer(todoList, changeTodolistTitleActionCreator(todoListId_1, newTitle))

    expect(newTodolist.length).toBe(2)
    expect(newTodolist[0].id).toBe(todoListId_1)
    expect(newTodolist[0].title).toBe(newTitle)
})
