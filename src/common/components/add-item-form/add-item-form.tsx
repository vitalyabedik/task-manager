import React, { ChangeEvent, KeyboardEvent, useState } from "react"

import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import ControlPoint from "@mui/icons-material/ControlPoint"

import { RejectValueType } from "common/utils"

type PropsType = {
  addItem: (title: string) => Promise<any>
  disabled?: boolean
}

export const AddItemForm: React.FC<PropsType> = React.memo(({ addItem, disabled }) => {
  const [title, setTitle] = useState("")
  const [error, setError] = useState<string | null>(null)

  const addItemHandler = () => {
    if (title.trim() !== "") {
      addItem(title.trim())
        .then(() => {
          setTitle("")
        })
        .catch((err: RejectValueType) => {
          if (err.data) {
            const messages = err.data.messages
            setError(messages.length ? messages[0] : "Some error occurred")
          }
        })
    } else {
      setError("Title is required")
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null)
    }
    if (e.key === "Enter") {
      addItemHandler()
    }
  }

  return (
    <div>
      <TextField
        variant={"outlined"}
        size={"small"}
        label={"Type value"}
        value={title}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        error={!!error}
        helperText={error}
      />
      <IconButton disabled={disabled} onClick={addItemHandler} color={"primary"}>
        <ControlPoint />
      </IconButton>
    </div>
  )
})
