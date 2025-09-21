// src/components/InputClient.jsx
import React, { useState, useRef, forwardRef, useImperativeHandle } from "react";
import TextField from "@mui/material/TextField";
import "../styles/InputClient.css"; // <-- importe o CSS

const InputClient = forwardRef(function InputClient({ placeholder = "" }, ref) {
  const [valor, setValor] = useState("");
  const inputRef = useRef(null);

  // expõe uma API mínima via ref, sem novas props
  useImperativeHandle(ref, () => ({
    getValue: () => valor,
    setValue: (v) => setValor(v ?? ""),
    clear: () => setValor(""),
    focus: () => inputRef.current?.focus(),
  }));

  return (
    <TextField
      className="inputClient"
      fullWidth
      size="small"
      placeholder={placeholder}
      value={valor}
      onChange={(e) => setValor(e.target.value)}
      inputRef={inputRef}
    />
  );
});

export default InputClient;
