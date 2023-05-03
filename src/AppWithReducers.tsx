import React, {Reducer, useReducer, useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {
    AppBar,
    Button, Checkbox,
    Container,
    createTheme, CssBaseline, FormControlLabel, FormGroup,
    Grid,
    IconButton,
    Paper,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {amber, lightGreen} from "@mui/material/colors";
import {
    ActionsTodolistType,
    addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC,
    todolistsReducer
} from "./reducers/todolists-reducer";
import {
    ActionsTaskType,
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./reducers/task-reducer";

export type filterValueType = 'all'| 'active'| 'completed';

export type TodoListType = {
    id: string
    title: string
    filter: filterValueType
}

export type TasksStateType = {
    [todolistId: string]: TaskType[]
}

function AppWithReducers(): JSX.Element {

    // BLL
    const todoListId_1 = v1();
    const todoListId_2 = v1();
    const [todoList, dispatchToTodolist] = useReducer<Reducer<TodoListType[], ActionsTodolistType>> (todolistsReducer, [
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ]);

    const [isDarkMode, setDarkMode] = useState<boolean>(false)

    const [tasks, dispatchToTask] = useReducer<Reducer<TasksStateType, ActionsTaskType>>(tasksReducer, {
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
    });

    const changeTdoListFilter = (filter: filterValueType, todoListId: string) => {
        /*setTodoList(todoList.map(tl => tl. id === todoListId ? {...tl, filter: filter} : tl))*/
        dispatchToTodolist(changeTodolistFilterAC(todoListId, filter))
    }

    const addTodolist = (title: string) => {
        /*const newTodoListId = v1();
        const newTodoList: TodoListType = {id: newTodoListId, title: title, filter: 'all'}

        setTodoList([...todoList, newTodoList])
        setTasks({...tasks, [newTodoListId]: []})*/
        const action = addTodolistAC(title)
        dispatchToTodolist(action)
        dispatchToTask(action)
    }

    const changeTodolistTitle = (newTitle: string, todoListId: string) => {
        /*setTodoList(todoList.map(tl => tl.id === todoListId ? {...tl, title: newTitle} : tl))*/
        dispatchToTodolist(changeTodolistTitleAC(todoListId, newTitle))
    }

    const removeTodoList = (todoListId: string) => {
        /*setTodoList(todoList.filter(tl => tl.id !== todoListId));
        const copyTasks = {...tasks};                                    // Важно делать копию
        delete copyTasks[todoListId];
        setTasks(copyTasks);*/
        const action = removeTodolistAC(todoListId)
        dispatchToTodolist(action)
        dispatchToTask(action)
    }

    const removeTasks = (taskId: string, todoListId: string) => {
        /*setTasks({...tasks, [todoListId]: [...tasks[todoListId].filter((tl: TodoListType) => tl.id !== taskId)]})*/
        dispatchToTask(removeTaskAC(taskId, todoListId))
    }

    const addTasks = (title: string, todoListId: string) => {
        /*setTasks({...tasks, [todoListId]: [...tasks[todoListId], {id: v1(), title: title, isDone: false}]})*/
        dispatchToTask(addTaskAC(title, todoListId))
    }

    const changeTaskStatus = (taskId: string, newIsDone: boolean, todoListId: string) => {
        /*setTasks({...tasks, [todoListId]: [...tasks[todoListId].map((tl: TodoListType) => tl.id === taskId ? {...tl, isDone: newIsDone}: tl)]})*/
        dispatchToTask(changeTaskStatusAC(taskId, newIsDone, todoListId))
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        /*setTasks({...tasks, [todoListId]: [...tasks[todoListId].map((tl: TodoListType) => tl.id === taskId ? {...tl, title: newTitle}: tl)]})*/
        dispatchToTask(changeTaskTitleAC(taskId, newTitle, todoListId))
    }

    const getFilteredTasks = (tasks: TaskType[], filter: filterValueType): TaskType[] => {
        switch (filter) {
            case "active":
                return tasks.filter(t => !t.isDone);
            case "completed":
                return tasks.filter(t => t.isDone);
            default:
                return tasks;
        }
    }


    const todoListComponents = todoList.map(tl => {
        let filteredTasks: Array<TaskType> = getFilteredTasks(tasks[tl.id], tl.filter);
        return (
            <Grid item>
                <Paper elevation={6}>
                    <Todolist
                        key={tl.id}
                        todoListId={tl.id}
                        title={tl.title}
                        tasks={filteredTasks}
                        filter={tl.filter}
                        changeTdoListFilter={changeTdoListFilter}
                        removeTasks={removeTasks}
                        setTasks={dispatchToTask}
                        addTasks={addTasks}
                        changeTaskStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    /*const mode = isDarkMode ? 'dark' : 'light';*/
    const customTheme = createTheme({
        palette: {
            primary: amber,
            secondary: lightGreen,
            mode: isDarkMode ? 'dark' : 'light'
        }
    })

    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline />
            <div className="App">
                <AppBar position={'static'}>
                    <Toolbar>
                        <IconButton
                            size={'large'}
                            edge={'start'}
                            color={'inherit'}
                            aria-label={'menu'}
                            sx={{mr: 2}}
                        >
                            <Menu />
                        </IconButton>
                        <Typography
                            variant={'h6'}
                            component={'div'}
                            sx={{flexGrow: 1}}
                        >
                            TodoLists
                        </Typography>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox
                                            onChange={(e) => setDarkMode(e.currentTarget.checked)} />}
                                    label={isDarkMode ? 'Light mode' : 'Dark mode'}
                                />
                        </FormGroup>
                        <Button color={'inherit'}>Login</Button>
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Grid container sx={{p: '30px 0'}}>
                        <AddItemForm maxLengthUserMessage={15} addNewItem={addTodolist} />
                    </Grid>
                    <Grid container spacing={4}>
                        {todoListComponents}
                    </Grid>
                </Container>
            </div>
        </ThemeProvider>
    );
}

export default AppWithReducers;
