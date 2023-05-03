import {addTodolistAC, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./task-reducer";
import {filterValueType} from "../AppWithReducers";

type TodoListsType = {
    id: string
    title:string
    filter: filterValueType
}
type TodolistsStateType = TodoListsType[]

test('ids should be equals', () => {
    const startTasksState = {}
    const startTodolistsState: TodolistsStateType = []

    const action = addTodolistAC('new todolists')


    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFormTasks = keys[0]
    const idFormTodolists = endTodolistsState[0].id

    expect(idFormTasks).toBe(action.todolistId)
    expect(idFormTodolists).toBe(action.todolistId)
})