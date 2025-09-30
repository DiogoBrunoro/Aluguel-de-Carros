"use client"
import type React from "react"
import { TextField, type TextFieldProps } from "@mui/material"

interface InputClientProps extends Omit<TextFieldProps, "variant" | "fullWidth" | "size"> {
  placeholder?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function InputClient({ placeholder, value, onChange, ...props }: InputClientProps) {
  return (
    <TextField
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      fullWidth
      variant="outlined"
      size="small"
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
          backgroundColor: "#f5f5f5",
          "&:hover": {
            backgroundColor: "#eeeeee",
          },
          "&.Mui-focused": {
            backgroundColor: "#ffffff",
          },
        },
      }}
      {...props}
    />
  )
}
