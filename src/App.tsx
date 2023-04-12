import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";
import {v1} from "uuid";
import todolist from "./Todolist";
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

export type filterValueType = 'all'| 'active'| 'completed';

export type TodoListType = {
    id: string
    title: string
}

export type TasksStateType = {
    [todolistId: string]: {
        data: TaskType[]
        filter: filterValueType
    }
}

function App(): JSX.Element {

    // BLL
    const todoListId_1 = v1();
    const todoListId_2 = v1();
    const [todoList, setTodoList] = useState<TodoListType[]>([
        {id: todoListId_1, title: 'What to learn',},
        {id: todoListId_2, title: 'What to buy',}
    ]);

    const [isDarkMode, setDarkMode] = useState<boolean>(true)

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: {
            data: [
                {id: v1(), title: 'HTML & CSS', isDone: true},
                {id: v1(), title: 'JavaScript & TypeScript', isDone: true},
                {id: v1(), title: 'React & Reduce', isDone: false},
            ],
            filter: 'all',
        },
        [todoListId_2]: {
            data: [
                {id: v1(), title: 'Milk', isDone: true},
                {id: v1(), title: 'Bread', isDone: true},
                {id: v1(), title: 'Meat', isDone: false},
            ],
            filter: 'all',
        }
    });

    const changeTdoListFilter = (filter: filterValueType, todoListId: string) => {
        setTasks({...tasks, [todoListId]: {
            ...tasks[todoListId], filter: filter
        }})
    }


    const removeTodoList = (todoListId: string) => {
        setTodoList(todoList.filter(tl => tl.id !== todoListId));
        const copyTasks = {...tasks};                                    // Важно делать копию
        delete copyTasks[todoListId];
        setTasks(copyTasks);
    }

    const removeTasks = (taskId: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: {
            ...tasks[todoListId], data: tasks[todoListId].data.filter(tl => tl.id !== taskId)
        }})
    }

    const addTasks = (title: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: {
            ...tasks[todoListId], data: [{id: v1(), title: title, isDone: false}, ...tasks[todoListId].data]
        }})
    }

    const changeTaskStatus = (taskId: string, newIsDone: boolean, todoListId: string) => {
        setTasks({...tasks, [todoListId]: {
            ...tasks[todoListId], data: tasks[todoListId].data.map(tl => tl.id === taskId ? {...tl, isDone: newIsDone}: tl)
        }})
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: {
                ...tasks[todoListId], data: tasks[todoListId].data.map(tl => tl.id === taskId ? {...tl, title: newTitle}: tl)
        }})
    }

    const changeTodolistTitle = (newTitle: string, todoListId: string) => {
        setTodoList(todoList.map(tl => tl.id === todoListId ? {...tl, title: newTitle} : tl))
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

    const addTodolist = (title: string) => {
        const newTodoListId = v1();
        const newTodoList = {id: newTodoListId, title: title,}

        setTodoList([...todoList, newTodoList])
        setTasks({...tasks, [newTodoListId]: {data: [], filter: 'all'}})
    }

    const todoListComponents = todoList.map(tl => {
        let filteredTasks: Array<TaskType> = getFilteredTasks(tasks[tl.id].data, tasks[tl.id].filter);
        return (
            <Grid item>
                <Paper elevation={6}>
                    <Todolist
                        key={tl.id}
                        todoListId={tl.id}
                        title={tl.title}
                        tasks={filteredTasks}
                        filter={tasks[tl.id].filter}
                        changeTdoListFilter={changeTdoListFilter}
                        removeTasks={removeTasks}
                        setTasks={setTasks}
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

    const mode = isDarkMode ? 'dark' : 'light';
    const customTheme = createTheme({
        palette: {
            primary: amber,
            secondary: lightGreen,
            mode: mode
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

export default App;
