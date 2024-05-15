import React, {useCallback, useState} from 'react';
import './App.css';
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
    addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC,
} from "./reducers/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
} from "./reducers/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";
import Todolist, {TaskType} from "./Todolist";
import {v1} from "uuid";

export type filterValueType = 'all'| 'active'| 'completed';

export type TodoListType = {
    id: string
    title: string
    filter: filterValueType
}

export type TasksStateType = {
    [todolistId: string]: TaskType[]
}

const AppWithRedux = (): JSX.Element => {

    // BLL
    const todoListId_1 = v1();
    const todoListId_2 = v1();
    const [isDarkMode, setDarkMode] = useState<boolean>(false)

    const todoList = useSelector<AppRootStateType, TodoListType[]> (state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType> (state => state.tasks);
    const dispatch = useDispatch()

    const changeTdoListFilter = useCallback((filter: filterValueType, todoListId: string) => {
        dispatch(changeTodolistFilterAC(todoListId, filter))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])

    const changeTodolistTitle = useCallback((newTitle: string, todoListId: string) => {
        dispatch(changeTodolistTitleAC(todoListId, newTitle))
    }, [dispatch])

    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodolistAC(todoListId))
    }, [dispatch])

    const removeTasks = useCallback((taskId: string, todoListId: string) => {
        dispatch(removeTaskAC(taskId, todoListId))
    }, [dispatch])

    const addTasks = useCallback((title: string, todoListId: string) => {
        dispatch(addTaskAC(title, todoListId))
    }, [dispatch])

    const changeTaskStatus = useCallback((taskId: string, newIsDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(taskId, newIsDone, todoListId))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, todoListId))
    }, [dispatch])

    /*const getFilteredTasks = (tasks: TaskType[], filter: filterValueType): TaskType[] => {
        switch (filter) {
            case "active":
                return tasks.filter(t => !t.isDone);
            case "completed":
                return tasks.filter(t => t.isDone);
            default:
                return tasks;
        }
    }*/


    const todoListComponents = todoList.map(tl => {
        /*let filteredTasks: Array<TaskType> = getFilteredTasks(tasks[tl.id], tl.filter);*/

        return (
            <Grid item>
                <Paper elevation={6}>
                    <Todolist
                        key={tl.id}
                        todoListId={tl.id}
                        title={tl.title}
                        tasks={tasks[tl.id]}
                        filter={tl.filter}
                        changeTdoListFilter={changeTdoListFilter}
                        removeTasks={removeTasks}
                        setTasks={dispatch}
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

export default AppWithRedux;
