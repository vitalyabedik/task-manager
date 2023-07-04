import {addTodolistAC, removeTodolistAC, TodolistDomainType, todolistsReducer} from './todolists-reducer';
import {TasksStateType} from '../../trash/App';
import {tasksReducer} from './Task/tasks-reducer';
import {TaskPriorities, TaskStatuses, TodolistType} from '../../api/todolist-api';

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: TodolistDomainType[] = []

    let todolist: TodolistType = {
        id: 'any id',
        title: 'newTodolistTitle',
        addedDate: '',
        order: 0
    }

    const action = addTodolistAC(todolist)

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolist.id)
    expect(idFromTodolists).toBe(action.todolist.id)
})

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {
                id: '1', title: 'CSS', status: TaskStatuses.New, priority: TaskPriorities.Low,
                startDate: '', deadline: '', todoListId: 'todolistId1', order: 0, addedDate: '', description: ''
            },
            {
                id: '2', title: 'JS', status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                startDate: '', deadline: '', todoListId: 'todolistId1', order: 0, addedDate: '', description: ''
            },
            {
                id: '3', title: 'React', status: TaskStatuses.New, priority: TaskPriorities.Low,
                startDate: '', deadline: '', todoListId: 'todolistId1', order: 0, addedDate: '', description: ''
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', status: TaskStatuses.New, priority: TaskPriorities.Low,
                startDate: '', deadline: '', todoListId: 'todolistId2', order: 0, addedDate: '', description: ''
            },
            {
                id: '2', title: 'milk', status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                startDate: '', deadline: '', todoListId: 'todolistId2', order: 0, addedDate: '', description: ''
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.New, priority: TaskPriorities.Low,
                startDate: '', deadline: '', todoListId: 'todolistId2', order: 0, addedDate: '', description: ''
            }
        ]
    }

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
