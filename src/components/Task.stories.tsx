import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'

import {Task} from './Task';
import {TaskPriorities, TaskStatuses} from '../api/todolist-api';
import {todolistId1} from '../state/todolists-reducer';

// More on how to set up stories at:
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    // This component will have an automatically generated Autodocs entry:
    // https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes:
    // https://storybook.js.org/docs/react/api/argtypes
    args: {
        task: {
            id: '12wsdewfijdei', title: 'JS', status: TaskStatuses.New, priority: TaskPriorities.Low,
            startDate: '', deadline: '', todoListId: todolistId1, order: 0, addedDate: '', description: ''
        },
        todolistId: 'fgdosrg8rgjuh',
        changeTaskStatus: action('Status changed inside Task'),
        changeTaskTitle: action('Title changed inside Task'),
        removeTask: action('Remove Button clicked changed inside Task')
    }
};

export default meta;
type Story = StoryObj<typeof Task>;

// More on component templates:
// https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const TaskIsDoneStory: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        task: {
            id: '12wsdewfijdei2343', title: 'CSS', status: TaskStatuses.Completed, priority: TaskPriorities.Low,
            startDate: '', deadline: '', todoListId: todolistId1, order: 0, addedDate: '', description: ''
        },
    },
};



