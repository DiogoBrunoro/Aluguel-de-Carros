"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  TextField,
  Button,
  Stack,
  Alert,
  Typography,
} from "@mui/material"
import { DirectionsCar, Save, Clear } from "@mui/icons-material"
import "../styles/PageClient.css"

export default function CadastroCarros() {
  const [formData, setFormData] = useState({
    marca: "",
    modelo: "",
    ano: "",
    matricula: "",
    placa: "",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleLimpar = () => {
    setFormData({
      marca: "",
      modelo: "",
      ano: "",
      matricula: "",
      placa: "",
    })
    setMessage({ type: "", text: "" })
  }

  const handleSalvar = async () => {
    if (!formData.marca || !formData.modelo || !formData.ano || !formData.matricula || !formData.placa) {
      setMessage({ type: "error", text: "Todos os campos são obrigatórios!" })
      return
    }

    if (formData.ano < 1900 || formData.ano > new Date().getFullYear() + 1) {
      setMessage({ type: "error", text: "Ano inválido!" })
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/carros", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setMessage({ type: "success", text: "Carro cadastrado com sucesso!" })
        handleLimpar()
      } else {
        const error = await response.json()
        setMessage({ type: "error", text: error.message || "Erro ao cadastrar carro" })
      }
    } catch (err) {
      console.error("Erro ao cadastrar carro:", err)
      setMessage({ type: "error", text: "Erro de conexão. Tente novamente." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="screen-center">
      <div className="client-card">
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            mb: 3,
          }}
        >
          <DirectionsCar sx={{ mr: 2, fontSize: "2.2rem", color: "#2563eb" }} />
          Cadastro de Carros
        </Typography>

        {message.text && (
          <Alert
            severity={message.type}
            sx={{
              mb: 3,
              borderRadius: 2,
              fontWeight: 500,
            }}
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
              <TextField
                label="Marca"
                value={formData.marca}
                onChange={(e) => handleInputChange("marca", e.target.value)}
                fullWidth
                required
              />

              <TextField
                label="Modelo"
                value={formData.modelo}
                onChange={(e) => handleInputChange("modelo", e.target.value)}
                fullWidth
                required
              />

              <TextField
                label="Ano"
                type="number"
                value={formData.ano}
                onChange={(e) => handleInputChange("ano", e.target.value)}
                fullWidth
                required
                inputProps={{ min: 1900, max: new Date().getFullYear() + 1 }}
              />

              <TextField
                label="Matrícula"
                value={formData.matricula}
                onChange={(e) => handleInputChange("matricula", e.target.value)}
                fullWidth
                required
              />

              <TextField
                label="Placa"
                value={formData.placa}
                onChange={(e) => handleInputChange("placa", e.target.value.toUpperCase())}
                fullWidth
                required
                placeholder="ABC-1234"
              />

              <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSalvar}
                  disabled={loading}
                  sx={{
                    flex: 1,
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 600,
                    fontSize: "1rem",
                    background: "linear-gradient(90deg,#2563eb,#1d4ed8)",
                    "&:hover": {
                      background: "linear-gradient(90deg,#1e40af,#1d4ed8)",
                    },
                  }}
                >
                  {loading ? "Salvando..." : "Salvar Carro"}
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<Clear />}
                  onClick={handleLimpar}
                  disabled={loading}
                  sx={{
                    flex: 1,
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 600,
                    fontSize: "1rem",
                    borderColor: "#9ca3af",
                    color: "#6b7280",
                    "&:hover": {
                      borderColor: "#4b5563",
                      color: "#111827",
                      backgroundColor: "#f3f4f6",
                    },
                  }}
                >
                  Limpar
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
