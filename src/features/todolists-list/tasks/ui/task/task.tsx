import React, { ChangeEvent, useCallback } from "react"

import styles from "features/todolists-list/tasks/ui/task/task.module.css"

import Checkbox from "@mui/material/Checkbox"
import { EditableSpan } from "common/components/editableSpan"
import IconButton from "@mui/material/IconButton"
import Delete from "@mui/icons-material/Delete"

import { TaskDomainType, tasksThunks } from "features/todolists-list/tasks/model/tasks.reducer"
import { TaskStatuses } from "common/enums"
import { useActions } from "common/hooks"

type PropsType = {
  task: TaskDomainType
  todolistId: string
}

export const Task: React.FC<PropsType> = React.memo(({ task, todolistId }) => {
  const { deleteTask, updateTask } = useActions(tasksThunks)

  const deleteTaskCallback = useCallback(() => deleteTask({ todolistId, taskId: task.id }), [todolistId, task.id])

  const changeTaskStatusCallback = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
      updateTask({
        todolistId,
        taskId: task.id,
        domainModel: { status },
      })
    },
    [todolistId, task.id],
  )

  const changeTaskTitleCallback = useCallback(
    (title: string) => {
      updateTask({ todolistId, taskId: task.id, domainModel: { title } })
    },
    [todolistId, task.id],
  )

  const taskStatusClasses = task.status === TaskStatuses.Completed ? styles.isDone : ""

  return (
    <div key={task.id} className={taskStatusClasses}>
      <Checkbox
        disabled={task.entityStatus === "loading"}
        onChange={changeTaskStatusCallback}
        checked={task.status === TaskStatuses.Completed}
      />
      <EditableSpan disabled={task.entityStatus === "loading"} onChange={changeTaskTitleCallback} title={task.title} />
      <IconButton disabled={task.entityStatus === "loading"} onClick={deleteTaskCallback}>
        <Delete />
      </IconButton>
    </div>
  )
})
