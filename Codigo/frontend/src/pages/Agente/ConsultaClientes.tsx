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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
  PersonAdd,   // Novo cliente
} from "@mui/icons-material";
// import "../styles/PageClient.css";
import InputClient from "../../components/InputClient";
import { Cliente } from "../../types/types";
import { listarClientes } from "../../api/clientes";

interface NovoClienteForm {
  nome: string
  email: string
  rg: string
  profissao: string
  endereco: string
}

export default function ConsultaClientes() {

  const initialFormData: Cliente = {
    nome: "",
    email: "",
    senha: "",
    endereco: "",
    profissao: "",
    rendimentos: "",
    empregadores: [],
    role: "CLIENTE"
  };

  const [clientes, setClientes] = useState<Cliente[]>([])
  const [busca, setBusca] = useState<string>("")
  const [editandoId, setEditandoId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Cliente>(initialFormData)
  const [dialogAberto, setDialogAberto] = useState<boolean>(false)
  const [novoCliente, setNovoCliente] = useState<NovoClienteForm>({
    nome: "",
    email: "",
    rg: "",
    profissao: "",
    endereco: "",
  })

  const carregarClientes = async () => {
      const clientes = await listarClientes() as Cliente[]
      setClientes(clientes)
  };

  useEffect(() => { carregarClientes(); }, []);

  const handleEditar = (cliente: Cliente): void => {
    if (!cliente.id) return
    setEditandoId(cliente.id)
    setFormData({ ...cliente })
  }

  const handleCancelar = (): void => {
    setEditandoId(null)
    setFormData(initialFormData)
  }

  const handleSalvar = async (): Promise<void> => {
    try {
      await fetch(`/api/clientes/${editandoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      setEditandoId(null)
    } catch (err) {
      console.error("Erro ao salvar cliente:", err)
    }
  }

  const handleExcluir = async (id: string): Promise<void> => {
    if (!window.confirm("Deseja realmente excluir este cliente?")) return
    try {
      await fetch(`http://localhost:3000/api/users/clientes/${id}`, { method: "DELETE" })
    } catch (err) {
      console.error("Erro ao excluir cliente:", err)
    }
  }

  const handleNovoCliente = async (): Promise<void> => {
    try {
      await fetch("/api/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoCliente),
      })
      setDialogAberto(false)
      setNovoCliente({
        nome: "",
        email: "",
        rg: "",
        profissao: "",
        endereco: "",
      })
    } catch (err) {
      console.error("Erro ao criar cliente:", err)
    }
  }

  const clientesFiltrados = clientes.filter((c) => c.nome.toLowerCase().includes(busca.toLowerCase()))

  return (
    <div className="screen-center">
      <div className="client-card">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 3 }}
        >
          <h2 className="client-title">Consulta de Clientes</h2>
          <Button
            variant="contained"
            startIcon={<PersonAdd />}
            onClick={() => setDialogAberto(true)}
            sx={{
              borderRadius: 2,
              fontWeight: 600,
              background: "linear-gradient(90deg,#22c55e,#16a34a)",
              "&:hover": { background: "linear-gradient(90deg,#15803d,#166534)" },
            }}
          >
            Novo Cliente
          </Button>
        </Stack>

        <InputClient
          placeholder="Buscar cliente"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <Grid container direction="column" spacing={2} sx={{ mt: 2 }}>
          {clientesFiltrados.length > 0 ? (
            clientesFiltrados.map((c) => (
              <Grid>
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
                            label="Email"
                            value={formData.email ?? ""}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
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
                            <CreditCard fontSize="small" /> <strong>Email:</strong> {c.email}
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
                        <IconButton sx={{ color: "#d32f2f" }} onClick={() => handleExcluir(c.id!)}>
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

        {/* Dialog Novo Cliente */}
        {/* Dialog Novo Cliente */}
        <Dialog
          open={dialogAberto}
          onClose={() => setDialogAberto(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
            },
          }}
        >
          <DialogTitle
            sx={{
              m: 0,
              p: 3,
              fontWeight: 700,
              fontSize: "1.4rem",
              textAlign: "center",
              background: "linear-gradient(90deg, #22c55e, #16a34a)",
              color: "white",
            }}
          >
            Novo Cliente
          </DialogTitle>

          <DialogContent sx={{ p: 4, backgroundColor: "#f9fafb", marginTop: 5 }}>
            <Stack spacing={3}>
              <TextField
                label="Nome"
                value={novoCliente.nome}
                onChange={(e) =>
                  setNovoCliente({ ...novoCliente, nome: e.target.value })
                }
                fullWidth
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "white",
                  },
                }}
              />
              <TextField
                label="Email"
                value={novoCliente.email}
                onChange={(e) =>
                  setNovoCliente({ ...novoCliente, email: e.target.value })
                }
                fullWidth
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "white",
                  },
                }}
              />
              <TextField
                label="RG"
                value={novoCliente.rg}
                onChange={(e) =>
                  setNovoCliente({ ...novoCliente, rg: e.target.value })
                }
                fullWidth
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "white",
                  },
                }}
              />
              <TextField
                label="Profissão"
                value={novoCliente.profissao}
                onChange={(e) =>
                  setNovoCliente({ ...novoCliente, profissao: e.target.value })
                }
                fullWidth
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "white",
                  },
                }}
              />
              <TextField
                label="Endereço"
                value={novoCliente.endereco}
                onChange={(e) =>
                  setNovoCliente({ ...novoCliente, endereco: e.target.value })
                }
                fullWidth
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "white",
                  },
                }}
              />
            </Stack>
          </DialogContent>

          <DialogActions
            sx={{
              p: 3,
              backgroundColor: "#f9fafb",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              onClick={() => setDialogAberto(false)}
              sx={{
                borderRadius: 3,
                px: 3,
                fontWeight: 600,
                color: "#374151",
                border: "1px solid #d1d5db",
                "&:hover": {
                  backgroundColor: "#e5e7eb",
                  borderColor: "#9ca3af",
                },
              }}
            >
              Cancelar
            </Button>

            <Button
              onClick={handleNovoCliente}
              variant="contained"
              sx={{
                borderRadius: 3,
                px: 3,
                fontWeight: 600,
                background: "linear-gradient(90deg, #22c55e, #16a34a)",
                boxShadow: "0 4px 14px rgba(22, 163, 74, 0.4)",
                "&:hover": {
                  background: "linear-gradient(90deg, #15803d, #166534)",
                },
              }}
            >
              Criar Cliente
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    </div>
  );
}