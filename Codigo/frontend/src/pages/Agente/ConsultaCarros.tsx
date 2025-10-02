import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  TextField,
  Stack,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import {
  Edit,
  Delete,
  Save,
  Cancel,
  DirectionsCar, // Carro
  DateRange,      // Ano
  LocalOffer,     // Marca/Modelo
  Tag,            // Placa/Matrícula
} from "@mui/icons-material";
// import "../styles/PageClient.css";
import InputClient from "../../components/InputClient";
import { Carro } from "../../types/types";

import apiUrl from "../../api/apiUrl";

const API_BASE_URL = apiUrl;

export default function ConsultaCarros() {
  const [carros, setCarros] = useState<Carro[]>([])
  const [busca, setBusca] = useState<string>("")
  const [editandoId, setEditandoId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Carro>>({})

  // Consulta carros do backend
  const carregarCarros = async (): Promise<void> => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/automoveis`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCarros(data); 
      } else {
        setCarros([]);
      }
    } catch (err) {
      console.error("Erro ao consultar carros:", err);
      setCarros([]);
    }
  };

  useEffect(() => {
    carregarCarros()
  }, [])

  const handleEditar = (carro: Carro): void => {
    setEditandoId(carro.id)
    setFormData({ ...carro })
  }

  const handleCancelar = (): void => {
    setEditandoId(null)
    setFormData({})
  }

  const handleSalvar = async (): Promise<void> => {
    if (!editandoId || !formData) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/automoveis/${editandoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setEditandoId(null);
        setFormData({});
        await carregarCarros();
      } else {
        const error = await response.json();
        alert(error.message || "Erro ao atualizar carro");
      }
    } catch (err) {
      console.error("Erro ao salvar carro:", err);
      alert("Erro de conexão. Tente novamente.");
    }
  };

  const handleExcluir = async (id: string): Promise<void> => {
    if (!window.confirm("Deseja realmente excluir este carro?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/automoveis/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (response.status === 204) {
        setCarros(carros.filter((c) => c.id !== id));
      } else {
        const error = await response.json();
        alert(error.message || "Erro ao excluir carro");
      }
    } catch (err) {
      console.error("Erro ao excluir carro:", err);
      alert("Erro de conexão. Tente novamente.");
    }
  };

  const carrosFiltrados = carros.filter(
    (c) =>
      c.placa.toLowerCase().includes(busca.toLowerCase()) ||
      c.marca.toLowerCase().includes(busca.toLowerCase()) ||
      c.modelo.toLowerCase().includes(busca.toLowerCase()),
  )

  return (
    <div className="screen-center">
      <div className="client-card"> {/* Mantendo a mesma classe para reuso de estilo */}
        <h2 className="client-title">Gestão de Carros</h2>

        <InputClient
          placeholder="Buscar carro por placa, marca ou modelo"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <Grid container direction="column" spacing={2} sx={{ mt: 2 }}>
          {carrosFiltrados.length > 0 ? (
            carrosFiltrados.map((c) => (
              <Grid>
                <Card
                  sx={{
                    borderRadius: 4,
                    background: "#f9fafb", // fundo claro sólido
                    border: "1px solid #e5e7eb",
                    color: "#1f2937",
                    width: "100%",
                    minHeight: 180,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  {editandoId === c.id ? (
                    <>
                      {/* Modo edição */}
                      <CardContent sx={{ p: 3 }}>
                        <Stack spacing={1.25}>
                          <TextField
                            label="Placa"
                            value={formData.placa ?? ""}
                            onChange={(e) =>
                              setFormData({ ...formData, placa: e.target.value })
                            }
                            fullWidth
                            size="small"
                          />
                          <TextField
                            label="Matrícula"
                            value={formData.matricula ?? ""}
                            onChange={(e) =>
                              setFormData({ ...formData, matricula: e.target.value })
                            }
                            fullWidth
                            size="small"
                          />
                          <TextField
                            label="Ano"
                            type="number"
                            value={formData.ano ?? ""}
                            onChange={(e) =>
                              setFormData({ ...formData, ano: Number(e.target.value) })
                            }
                            fullWidth
                            size="small"
                          />
                          <TextField
                            label="Marca"
                            value={formData.marca ?? ""}
                            onChange={(e) =>
                              setFormData({ ...formData, marca: e.target.value })
                            }
                            fullWidth
                            size="small"
                          />
                          <TextField
                            label="Modelo"
                            value={formData.modelo ?? ""}
                            onChange={(e) =>
                              setFormData({ ...formData, modelo: e.target.value })
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
                        sx={{ px: 2, py: 1.5, borderTop: "1px solid #e5e7eb" }}
                      >
                        <IconButton
                          sx={{ color: "#22c55e", "&:hover": { backgroundColor: "rgba(34,197,94,0.1)" } }}
                          onClick={handleSalvar}
                        >
                          <Save />
                        </IconButton>
                        <IconButton
                          sx={{ color: "#6b7280", "&:hover": { backgroundColor: "rgba(107,114,128,0.1)" } }}
                          onClick={handleCancelar}
                        >
                          <Cancel />
                        </IconButton>
                      </Stack>
                    </>
                  ) : (
                    <>
                      {/* Modo visualização */}
                      <CardContent sx={{ p: 3 }}>
                        <Stack direction="row" spacing={3} alignItems="center" sx={{ mb: 3 }}>
                          {/* Imagem à esquerda */}
                          <Box
                            component="img"
                            src={c.imagemUrl || "/placeholder.png"} // Substitua pelo URL da imagem
                            alt={`${c.marca} ${c.modelo}`}
                            sx={{ width: 150, height: "100%", borderRadius: 2, objectFit: "cover" }}
                          />

                          {/* Conteúdo do card */}
                          <Stack spacing={1} flex={1}>
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: 700, mb: 2, color: "#111827" }}
                            >
                              {c.marca} {c.modelo} ({c.ano})
                            </Typography>

                            <Stack spacing={1}>
                              <Typography
                                variant="body2"
                                sx={{ display: "flex", alignItems: "center", gap: 1, color: "#374151" }}
                              >
                                <Tag fontSize="small" sx={{ color: "#2563eb" }} />
                                <strong>Placa:</strong> {c.placa}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ display: "flex", alignItems: "center", gap: 1, color: "#374151" }}
                              >
                                <DirectionsCar fontSize="small" sx={{ color: "#16a34a" }} />
                                <strong>Matrícula:</strong> {c.matricula}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ display: "flex", alignItems: "center", gap: 1, color: "#374151" }}
                              >
                                <DateRange fontSize="small" sx={{ color: "#9333ea" }} />
                                <strong>Ano:</strong> {c.ano}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Stack>

                        {/* Botões de ação */}
                        <Stack
                          direction="row"
                          justifyContent="flex-end"
                          spacing={1}
                          sx={{ px: 2, borderTop: "1px solid #e5e7eb" }}
                        >
                          <IconButton
                            sx={{ color: "#3b82f6", "&:hover": { backgroundColor: "rgba(59,130,246,0.1)" } }}
                            onClick={() => handleEditar(c)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            sx={{ color: "#ef4444", "&:hover": { backgroundColor: "rgba(239,68,68,0.1)" } }}
                            onClick={() => handleExcluir(c.id)}
                          >
                            <Delete />
                          </IconButton>
                        </Stack>
                      </CardContent>
                    </>
                  )}
                </Card>


              </Grid>
            ))
          ) : (
            <Typography variant="body1">Nenhum carro encontrado.</Typography>
          )}
        </Grid>
      </div>
    </div>
  );
}