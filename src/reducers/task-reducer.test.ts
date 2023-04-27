import {TasksStateType} from '../App'
import {v1} from "uuid";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./task-reducer";
import {addTodolistActionCreator, removeTodolistActionCreator} from "./todolists-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type StateType = {
    "todoListID1": TaskType[]
    "todoListID2": TaskType[]
}

test('correct task should be deleted from correct array', () => {
    const startState: StateType = {
        "todoListID1": [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "ReactJS", isDone: false},
        ],
        "todoListID2": [
            {id: "1", title: "Rest API", isDone: false},
            {id: "2", title: "GraphQL", isDone: false},
            {id: "3", title: "API", isDone: false},
        ]
    }

    const action = removeTaskAC("2", "todoListID2")

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todoListID1": [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "ReactJS", isDone: false},
        ],
        "todoListID2": [
            {id: "1", title: "Rest API", isDone: false},
            {id: "3", title: "API", isDone: false},
        ]
    })

})
test('correct task should be added to correct array', () => {
    const startState = {
        "todoListID1": [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "ReactJS", isDone: false},
        ],
        "todoListID2": [
            {id: "1", title: "Rest API", isDone: false},
            {id: "2", title: "GraphQL", isDone: false},
            {id: "3", title: "API", isDone: false},
        ]
    }


    const action = addTaskAC("juce", "todoListID2")

    const endState = tasksReducer(startState, action)

    expect(endState["todoListID1"].length).toBe(3)
    expect(endState["todoListID2"].length).toBe(4)
    expect(endState["todoListID2"][0].id).toBeDefined()
    expect(endState["todoListID2"][0].title).toBe('juce')
    expect(endState["todoListID2"][0].isDone).toBe(false)

})
test('status of specified task should be changed', () => {
    const startState = {
        "todoListID1": [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "ReactJS", isDone: false},
        ],
        "todoListID2": [
            {id: "1", title: "Rest API", isDone: false},
            {id: "2", title: "GraphQL", isDone: false},
            {id: "3", title: "API", isDone: false},
        ]
    }


    const action = changeTaskStatusAC("2", true, "todoListID2")

    const endState = tasksReducer(startState, action)
    expect(endState["todoListID1"][1].isDone).toBe(true)
    expect(endState["todoListID2"][1].isDone).toBe(true)
})
test('title of specified task should be changed', () => {
    const startState = {
        "todoListID1": [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "ReactJS", isDone: false},
        ],
        "todoListID2": [
            {id: "1", title: "Rest API", isDone: false},
            {id: "2", title: "GraphQL", isDone: false},
            {id: "3", title: "API", isDone: false},
        ]
    }


    const action = changeTaskTitleAC("2", "Python", "todoListID2")

    const endState = tasksReducer(startState, action)
    expect(endState["todoListID1"][1].title).toBe("JS")
    expect(endState["todoListID2"][1].title).toBe("Python")
})
test('new array should be added when new todolist is added', () => {
    const startState = {
        "todoListID1": [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "ReactJS", isDone: false},
        ],
        "todoListID2": [
            {id: "1", title: "Rest API", isDone: false},
            {id: "2", title: "GraphQL", isDone: false},
            {id: "3", title: "API", isDone: false},
        ]
    }


    const action = addTodolistActionCreator('new todolist')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todoListID1' && k != 'todoListID2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const startState = {
        "todoListID1": [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "ReactJS", isDone: false},
        ],
        "todoListID2": [
            {id: "1", title: "Rest API", isDone: false},
            {id: "2", title: "GraphQL", isDone: false},
            {id: "3", title: "API", isDone: false},
        ]
    }

    const action = removeTodolistActionCreator("todoListID2")
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState["todoListID2"]).not.toBeDefined()
})



