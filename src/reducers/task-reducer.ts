import React from "react";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveActionTodolistType} from "./todolists-reducer";
import {TasksStateType} from "../AppWithReducers";

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

export type ActionsTaskType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTodolistActionType
    | RemoveActionTodolistType

export const tasksReducer = (state: TasksStateType, action: ActionsTaskType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .filter((task: { id: string; }) => task.id !== action.payload.taskId)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.payload.todolistId]: [{id: v1(), title: action.payload.title, isDone: false},
                    ...state[action.payload.todolistId],]

            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map((task: {id: string, title: string, isDone: boolean}) => task.id === action.payload.taskId ? {...task, isDone: action.payload.taskStatus} : task)
            }
            case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map((task: {id: string, title: string, isDone: boolean}) => task.id === action.payload.taskId ? {...task, title: action.payload.title} : task)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolistId]: []
            }
        case 'REMOVE-TODOLIST':
            /*const {[action.id]: [], ...rest} = state
            return rest*/
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        default: throw new Error(`I don't understand this type`)
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', payload: {taskId, todolistId}} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK', payload: {title, todolistId}} as const
}
export const changeTaskStatusAC = (taskId: string, taskStatus: boolean, todolistId: string) => {
    return {type: 'CHANGE-TASK-STATUS', payload: {taskId, taskStatus, todolistId}} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE', payload: {taskId, title, todolistId}} as const
}
