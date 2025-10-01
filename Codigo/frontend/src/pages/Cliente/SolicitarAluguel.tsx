"use client"

import { useState, useEffect } from "react"
import {
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from "@mui/material"
import { AddCircle, Save } from "@mui/icons-material"
import type { Carro, MessageState } from "../../types/types"
import { useAuth } from "../../hooks/useAuth"

export default function SolicitarAluguel() {
  const { user } = useAuth()
  const [carros, setCarros] = useState<Carro[]>([])
  const [formData, setFormData] = useState({
    carroId: "",
    dataInicio: "",
    dataFim: "",
  })
  const [message, setMessage] = useState<MessageState>({ type: "", text: "" })
  const [loading, setLoading] = useState(false)

  // Mock de carros disponíveis
  const mockCarros: Carro[] = [
    {
      id: "car1",
      placa: "ABC-1234",
      matricula: "MV-001",
      ano: 2020,
      marca: "Toyota",
      modelo: "Corolla",
      disponivel: true,
    },
    {
      id: "car2",
      placa: "XYZ-5678",
      matricula: "MV-002",
      ano: 2022,
      marca: "Honda",
      modelo: "Civic",
      disponivel: true,
    },
  ]

  useEffect(() => {
    setCarros(mockCarros.filter((c) => c.disponivel))
  }, [])

  const handleSubmit = async () => {
    if (!formData.carroId || !formData.dataInicio || !formData.dataFim) {
      setMessage({ type: "error", text: "Todos os campos são obrigatórios!" })
      return
    }

    const inicio = new Date(formData.dataInicio)
    const fim = new Date(formData.dataFim)

    if (fim <= inicio) {
      setMessage({ type: "error", text: "A data de fim deve ser posterior à data de início!" })
      return
    }

    setLoading(true)
    try {
      // Aqui você faria a chamada à API
      console.log("Solicitando aluguel:", { ...formData, clienteId: user?.id })
      setMessage({ type: "success", text: "Solicitação de aluguel enviada com sucesso!" })
      setFormData({ carroId: "", dataInicio: "", dataFim: "" })
    } catch (err) {
      console.error("Erro ao solicitar aluguel:", err)
      setMessage({ type: "error", text: "Erro ao enviar solicitação. Tente novamente." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          mb: 3,
        }}
      >
        <AddCircle sx={{ mr: 2, fontSize: "2.2rem", color: "#22c55e" }} />
        Solicitar Aluguel
      </Typography>

      {message.text && (
        <Alert
          severity={message.type === "success" ? "success" : "error"}
          sx={{ mb: 3, borderRadius: 2, fontWeight: 500 }}
          onClose={() => setMessage({ type: "", text: "" })}
        >
          {message.text}
        </Alert>
      )}

      <Card
        sx={{
          borderRadius: 4,
          boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
          background: "#ffffff",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3}>
            <FormControl fullWidth>
              <InputLabel>Selecione o Carro</InputLabel>
              <Select
                value={formData.carroId}
                onChange={(e) => setFormData({ ...formData, carroId: e.target.value })}
                label="Selecione o Carro"
              >
                {carros.map((carro) => (
                  <MenuItem key={carro.id} value={carro.id}>
                    {carro.marca} {carro.modelo} - {carro.placa} ({carro.ano})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Data de Início"
              type="date"
              value={formData.dataInicio}
              onChange={(e) => setFormData({ ...formData, dataInicio: e.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: new Date().toISOString().split("T")[0] }}
            />

            <TextField
              label="Data de Fim"
              type="date"
              value={formData.dataFim}
              onChange={(e) => setFormData({ ...formData, dataFim: e.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: formData.dataInicio || new Date().toISOString().split("T")[0] }}
            />

            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={handleSubmit}
              disabled={loading}
              sx={{
                py: 1.5,
                borderRadius: 3,
                fontWeight: 600,
                fontSize: "1rem",
                background: "linear-gradient(90deg,#22c55e,#16a34a)",
                "&:hover": {
                  background: "linear-gradient(90deg,#15803d,#166534)",
                },
              }}
            >
              {loading ? "Enviando..." : "Enviar Solicitação"}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  )
}
