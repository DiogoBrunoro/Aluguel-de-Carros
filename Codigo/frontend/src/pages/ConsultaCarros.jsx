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
import "../styles/PageClient.css"; 
import InputClient from "../components/InputClient"; // Reutilizando seu componente de input

export default function ConsultaCarros() {
  const [carros, setCarros] = useState([]);
  const [busca, setBusca] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({});

  // Mock de dados para simular a API. Remova isso ao integrar com o backend real.
  const mockCarros = [
    {
      id: "car1",
      placa: "ABC-1234",
      matricula: "MV-001",
      ano: 2020,
      marca: "Toyota",
      modelo: "Corolla",
    },
    {
      id: "car2",
      placa: "XYZ-5678",
      matricula: "MV-002",
      ano: 2022,
      marca: "Honda",
      modelo: "Civic",
    },
    {
      id: "car3",
      placa: "DEF-9012",
      matricula: "MV-003",
      ano: 2019,
      marca: "Volkswagen",
      modelo: "Jetta",
    },
  ];

  const carregarCarros = () => {
    // Substitua pelo fetch real da sua API
    // fetch("/api/carros")
    //   .then((res) => res.json())
    //   .then((data) => setCarros(data))
    //   .catch((err) => console.error("Erro ao buscar carros:", err));
    setCarros(mockCarros); // Usando mock data
  };

  useEffect(() => {
    carregarCarros();
  }, []);

  const handleEditar = (carro) => {
    setEditandoId(carro.id);
    setFormData({ ...carro });
  };

  const handleCancelar = () => {
    setEditandoId(null);
    setFormData({});
  };

  const handleSalvar = async () => {
    try {
      // await fetch(`/api/carros/${editandoId}`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });
      console.log("Salvando carro:", formData); // Simulação de salvamento
      setEditandoId(null);
      carregarCarros(); // Recarrega para mostrar a alteração (em um cenário real, a API retornaria o item atualizado)
    } catch (err) {
      console.error("Erro ao salvar carro:", err);
    }
  };

  const handleExcluir = async (id) => {
    if (!window.confirm("Deseja realmente excluir este carro?")) return;
    try {
      // await fetch(`/api/carros/${id}`, { method: "DELETE" });
      console.log("Excluindo carro com ID:", id); // Simulação de exclusão
      setCarros(carros.filter((c) => c.id !== id)); // Remove do estado local
    } catch (err) {
      console.error("Erro ao excluir carro:", err);
    }
  };

  const carrosFiltrados = carros.filter((c) =>
    c.placa.toLowerCase().includes(busca.toLowerCase()) ||
    c.marca.toLowerCase().includes(busca.toLowerCase()) ||
    c.modelo.toLowerCase().includes(busca.toLowerCase())
  );

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
              <Grid item xs={12} key={c.id}>
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
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 2,
            color: "#111827",
          }}
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
      </CardContent>

      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={1}
        sx={{ px: 2, py: 1.5, borderTop: "1px solid #e5e7eb" }}
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