// src/pages/ConsultaClientes.jsx
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  TextField,
  Stack,
} from "@mui/material";
import {
  Edit,
  Delete,
  Save,
  Cancel,
  Badge,       // RG
  CreditCard,  // CPF
  Work,        // Profissão
  Home,        // Endereço
} from "@mui/icons-material";
import "../styles/PageClient.css";
import InputClient from "../components/InputClient";

export default function ConsultaClientes() {
  const [clientes, setClientes] = useState([]);
  const [busca, setBusca] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({});

  const carregarClientes = () => {
    fetch("/api/clientes")
      .then((res) => res.json())
      .then((data) => setClientes(data))
      .catch((err) => console.error("Erro ao buscar clientes:", err));
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  const handleEditar = (cliente) => {
    setEditandoId(cliente.id);
    setFormData({ ...cliente });
  };

  const handleCancelar = () => {
    setEditandoId(null);
    setFormData({});
  };

  const handleSalvar = async () => {
    try {
      await fetch(`/api/clientes/${editandoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setEditandoId(null);
      carregarClientes();
    } catch (err) {
      console.error("Erro ao salvar cliente:", err);
    }
  };

  const handleExcluir = async (id) => {
    if (!window.confirm("Deseja realmente excluir este cliente?")) return;
    try {
      await fetch(`/api/clientes/${id}`, { method: "DELETE" });
      carregarClientes();
    } catch (err) {
      console.error("Erro ao excluir cliente:", err);
    }
  };

  const clientesFiltrados = clientes.filter((c) =>
    c.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="screen-center">
      <div className="client-card">
        <h2 className="client-title">Consulta de Clientes</h2>

        <InputClient
          placeholder="Buscar cliente"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <Grid container direction="column" spacing={2} sx={{ mt: 2 }}>
          {clientesFiltrados.length > 0 ? (
            clientesFiltrados.map((c) => (
              <Grid item xs={12} key={c.id}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                    background: "#E0E0E0",
                    color: "black",
                    width: "100%",
                    minHeight: 180,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  {editandoId === c.id ? (
                    <>
                      {/* Modo edição */}
                      <CardContent sx={{ p: 3 }}>
                        <Stack spacing={1.25}>
                          <TextField
                            label="Nome"
                            value={formData.nome ?? ""}
                            onChange={(e) =>
                              setFormData({ ...formData, nome: e.target.value })
                            }
                            fullWidth
                            size="small"
                          />
                          <TextField
                            label="CPF"
                            value={formData.cpf ?? ""}
                            onChange={(e) =>
                              setFormData({ ...formData, cpf: e.target.value })
                            }
                            fullWidth
                            size="small"
                          />
                          <TextField
                            label="RG"
                            value={formData.rg ?? ""}
                            onChange={(e) =>
                              setFormData({ ...formData, rg: e.target.value })
                            }
                            fullWidth
                            size="small"
                          />
                          <TextField
                            label="Profissão"
                            value={formData.profissao ?? ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                profissao: e.target.value,
                              })
                            }
                            fullWidth
                            size="small"
                          />
                          <TextField
                            label="Endereço"
                            value={formData.endereco ?? ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                endereco: e.target.value,
                              })
                            }
                            fullWidth
                            size="small"
                          />
                        </Stack>
                      </CardContent>

                      <Stack
                        direction="row"
                        justifyContent="flex-end"
                        spacing={1}
                        sx={{ px: 2, py: 1, borderTop: "1px solid rgba(0,0,0,0.12)" }}
                      >
                        <IconButton sx={{ color: "#2e7d32" }} onClick={handleSalvar}>
                          <Save />
                        </IconButton>
                        <IconButton sx={{ color: "#6b7280" }} onClick={handleCancelar}>
                          <Cancel />
                        </IconButton>
                      </Stack>
                    </>
                  ) : (
                    <>
                      {/* Modo visualização */}
                      <CardContent sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                          {c.nome}
                        </Typography>
                        <Stack spacing={1}>
                          <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <CreditCard fontSize="small" /> <strong>CPF:</strong> {c.cpf}
                          </Typography>
                          <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Badge fontSize="small" /> <strong>RG:</strong> {c.rg}
                          </Typography>
                          <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Work fontSize="small" /> <strong>Profissão:</strong> {c.profissao}
                          </Typography>
                          <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Home fontSize="small" /> <strong>Endereço:</strong> {c.endereco}
                          </Typography>
                        </Stack>
                      </CardContent>

                      <Stack
                        direction="row"
                        justifyContent="flex-end"
                        spacing={1}
                        sx={{ px: 2, py: 1, borderTop: "1px solid rgba(0,0,0,0.12)" }}
                      >
                        <IconButton sx={{ color: "#1976d2" }} onClick={() => handleEditar(c)}>
                          <Edit />
                        </IconButton>
                        <IconButton sx={{ color: "#d32f2f" }} onClick={() => handleExcluir(c.id)}>
                          <Delete />
                        </IconButton>
                      </Stack>
                    </>
                  )}
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1">Nenhum cliente encontrado.</Typography>
          )}
        </Grid>
      </div>
    </div>
  );
}
