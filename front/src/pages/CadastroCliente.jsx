// src/pages/CadastroCliente.jsx
import React, { useRef, useState } from "react";
import { Button } from "@mui/material";
import InputClient from "../components/InputClient";
import "../styles/PageClient.css";

const API =
  (typeof window !== "undefined" && window.API_BASE) ||
  (typeof window !== "undefined"
    ? `${window.location.origin}/api`
    : "http://localhost:3000/api");

export default function CadastroCliente() {
  const nomeRef = useRef(null);
  const cpfRef = useRef(null);
  const rgRef = useRef(null);
  const profRef = useRef(null);
  const endRef = useRef(null);

  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setErr("");

    const payload = {
      nome: nomeRef.current?.getValue() || "",
      cpf: cpfRef.current?.getValue() || null,
      rg: rgRef.current?.getValue() || null,
      profissao: profRef.current?.getValue() || null,
      endereco: endRef.current?.getValue() || null,
      empregadores: [], // seu back aceita array; deixei vazio aqui
    };

    if (!payload.nome.trim()) {
      setErr("Nome é obrigatório.");
      return;
    }

    try {
      const r = await fetch(`${API}/clientes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!r.ok) throw new Error((await r.text()) || "Falha ao salvar");

      // sucesso
      setMsg("Cliente cadastrado!");
      nomeRef.current?.clear();
      cpfRef.current?.clear();
      rgRef.current?.clear();
      profRef.current?.clear();
      endRef.current?.clear();
      nomeRef.current?.focus();
    } catch (e) {
      setErr(e.message || "Erro ao cadastrar");
    }
  };

  return (
    <div className="screen-center">
      <form className="client-card" onSubmit={onSubmit}>
        <h2 className="client-title">Cadastro de Cliente</h2>

        <div className="client-stack">
          <InputClient ref={nomeRef} placeholder="Nome completo *" />
          <InputClient ref={cpfRef} placeholder="CPF" />
          <InputClient ref={rgRef} placeholder="RG" />
          <InputClient ref={profRef} placeholder="Profissão" />
          <InputClient ref={endRef} placeholder="Endereço" />

          {msg && (
            <div style={{ color: "#22c55e", textAlign: "center", fontWeight: 600 }}>
              {msg}
            </div>
          )}
          {err && (
            <div style={{ color: "#ef4444", textAlign: "center", fontWeight: 600 }}>
              {err}
            </div>
          )}

          <div className="client-actions">
            <Button type="submit" variant="contained">
              Salvar
            </Button>
            <Button
              variant="outlined"
              type="button"
              onClick={() => {
                nomeRef.current?.clear();
                cpfRef.current?.clear();
                rgRef.current?.clear();
                profRef.current?.clear();
                endRef.current?.clear();
                setMsg("");
                setErr("");
                nomeRef.current?.focus();
              }}
            >
              Limpar
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
