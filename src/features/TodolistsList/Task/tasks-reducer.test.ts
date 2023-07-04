import {addTaskAC, updateTaskAC, removeTaskAC, tasksReducer} from './tasks-reducer'
import {TasksStateType} from '../../../trash/App'
import {addTodolistAC} from '../todolists-reducer';
import {TaskPriorities, TaskStatuses} from '../../../api/todolist-api';

let startState: TasksStateType

beforeEach(() => {
    startState = {
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
})

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC('todolistId2', '2')

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
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
                id: '3', title: 'tea', status: TaskStatuses.New, priority: TaskPriorities.Low,
                startDate: '', deadline: '', todoListId: 'todolistId2', order: 0, addedDate: '', description: ''
            }
        ]
    })

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'].every(t => t.id !== '2')).toBeTruthy()
})

test('correct task should be added to correct array', () => {
    const action = addTaskAC({
        id: '1', title: 'juce', status: TaskStatuses.New, priority: TaskPriorities.Low,
        startDate: '', deadline: '', todoListId: 'todolistId2', order: 0, addedDate: '', description: ''
    })

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {
    const action = updateTaskAC('todolistId2', '2', {status: TaskStatuses.New})

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
})

test('title of specified task should be changed', () => {
    const action = updateTaskAC('todolistId2', '2', {title: 'water'})

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('water')
    expect(endState['todolistId1'][1].title).toBe('JS')
})

test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC({
        id: 'any id',
        title: 'new todolist',
        addedDate: '',
        order: 0
    })

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
