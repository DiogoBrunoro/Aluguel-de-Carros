"use client"
import { TextField } from "@mui/material"

export default function InputClient({ placeholder, value, onChange, ...props }) {
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
