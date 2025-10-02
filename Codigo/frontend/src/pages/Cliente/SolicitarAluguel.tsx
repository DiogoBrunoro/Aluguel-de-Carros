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
import apiUrl from "../../api/apiUrl"
import { createAluguel } from "../../api/aluguel"

export default function SolicitarAluguel() {
  const { user } = useAuth()
  const [carros, setCarros] = useState<Carro[]>([])
  const [formData, setFormData] = useState({
    carroId: "",
    data_inicio: "",
    data_fim: "",
    valor: "",
  })
  const [message, setMessage] = useState<MessageState>({ type: "", text: "" })
  const [loading, setLoading] = useState(false)
  console.log(formData)
  useEffect(() => {
    const fetchCarros = async () => {
      try {
        const token = localStorage.getItem("token")

        const response = await fetch("http://localhost:3000/api/automoveis/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        })

        console.log("Response: ", response)

        if (!response.ok) {
          throw new Error("Erro ao buscar automóveis")
        }

        const data = await response.json()

        // Filtra apenas os carros disponíveis
        const carrosDisponiveis = data.filter((carro: { disponivel: boolean }) => carro.disponivel === true)

        setCarros(carrosDisponiveis)
      } catch (error) {
        console.error("Erro:", error)
      }
    }

    fetchCarros()
  }, [])

  const handleSubmit = async () => {
    if (!formData.carroId || !formData.data_inicio || !formData.data_fim) {
      setMessage({ type: "error", text: "Todos os campos são obrigatórios!" })
      return
    }

    const inicio = new Date(formData.data_inicio)
    const fim = new Date(formData.data_fim)

    if (fim <= inicio) {
      setMessage({ type: "error", text: "A data de fim deve ser posterior à data de início!" })
      return
    }

    setLoading(true)
    try {
      if(!user?.id){
        throw new Error("Usuário nao autenticado")
      }
      const data = createAluguel({
        cliente_id: user?.id,
        automovel_id: formData.carroId,
        data_inicio: formData.data_inicio,
        data_fim: formData.data_fim,
        valor: formData.valor
      })

      console.log(data)

      setMessage({ type: "success", text: "Solicitação de aluguel enviada com sucesso!" })
      setFormData({ carroId: "", data_inicio: "", data_fim: "" , valor: ""})
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
              label="Valor Diário"
              type="number"
              value={formData.valor}
              onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Data de Início"
              type="date"
              value={formData.data_inicio}
              onChange={(e) => setFormData({ ...formData, data_inicio: e.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: new Date().toISOString().split("T")[0] }}
            />

            <TextField
              label="Data de Fim"
              type="date"
              value={formData.data_fim}
              onChange={(e) => setFormData({ ...formData, data_fim: e.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: formData.data_inicio || new Date().toISOString().split("T")[0] }}
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
