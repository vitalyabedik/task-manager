import React, { ChangeEvent, useState } from "react"

import TextField from "@mui/material/TextField"

type PropsType = {
  disabled?: boolean
  title: string
  onChange: (newValue: string) => void
}
export const EditableSpan: React.FC<PropsType> = React.memo(({ title, onChange, disabled }) => {
  const [editMode, setEditMode] = useState(false)
  const [localTitle, setLocalTitle] = useState("")

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setLocalTitle(e.currentTarget.value)

  const activateEditMode = () => {
    if (disabled) return
    setEditMode(true)
    setLocalTitle(title)
  }

  const activateViewMode = () => {
    setEditMode(false)
    onChange(localTitle)
  }

  return editMode ? (
    <TextField size={"small"} onChange={onChangeHandler} value={localTitle} onBlur={activateViewMode} autoFocus />
  ) : (
    <span onDoubleClick={activateEditMode}>{title}</span>
  )
})
