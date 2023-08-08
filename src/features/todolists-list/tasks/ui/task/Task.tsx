import React, { ChangeEvent } from "react"

import styles from "features/todolists-list/todolists/ui/todolist/Todolist.module.css"

import Checkbox from "@mui/material/Checkbox"
import { EditableSpan } from "common/components/EditableSpan"
import IconButton from "@mui/material/IconButton"
import Delete from "@mui/icons-material/Delete"

import { TaskDomainType, tasksThunks } from "features/todolists-list/tasks/model/tasks.reducer"
import { TaskStatuses } from "common/enums"
import { useActions } from "common/hooks"

type TaskPropsType = {
  task: TaskDomainType
  todolistId: string
}

export const Task = React.memo((props: TaskPropsType) => {
  const { deleteTask, updateTask } = useActions(tasksThunks)

  const deleteTaskHandler = () => deleteTask({ todolistId: props.todolistId, taskId: props.task.id })

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    updateTask({
      todolistId: props.todolistId,
      taskId: props.task.id,
      domainModel: { status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New },
    })
  }

  const changeTaskTitleHandler = (newTitle: string) => {
    updateTask({ todolistId: props.todolistId, taskId: props.task.id, domainModel: { title: newTitle } })
  }

  const taskStatusClasses = props.task.status === TaskStatuses.Completed ? styles.isDone : ""

  return (
    <div key={props.task.id} className={taskStatusClasses}>
      <Checkbox
        disabled={props.task.entityStatus === "loading"}
        onChange={changeTaskStatusHandler}
        checked={props.task.status === TaskStatuses.Completed}
      />
      <EditableSpan
        disabled={props.task.entityStatus === "loading"}
        onChange={changeTaskTitleHandler}
        title={props.task.title}
      />
      <IconButton disabled={props.task.entityStatus === "loading"} onClick={deleteTaskHandler}>
        <Delete />
      </IconButton>
    </div>
  )
})
