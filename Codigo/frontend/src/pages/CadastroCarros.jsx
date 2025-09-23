"use client"

import { useState } from "react"
import { Card, CardContent, TextField, Button, Stack, Alert } from "@mui/material"
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
    // Validação básica
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
        <h2 className="client-title">
          <DirectionsCar sx={{ mr: 2, fontSize: "2rem" }} />
          Cadastro de Carros
        </h2>

        {message.text && (
          <Alert
            severity={message.type}
            sx={{ mb: 3, borderRadius: 2 }}
            onClose={() => setMessage({ type: "", text: "" })}
          >
            {message.text}
          </Alert>
        )}

        <Card
          sx={{
            borderRadius: 3,
            boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
            background: "#E0E0E0",
            color: "black",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Stack spacing={3}>
              <TextField
                label="Marca"
                value={formData.marca}
                onChange={(e) => handleInputChange("marca", e.target.value)}
                fullWidth
                variant="outlined"
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "#f5f5f5",
                  },
                }}
              />

              <TextField
                label="Modelo"
                value={formData.modelo}
                onChange={(e) => handleInputChange("modelo", e.target.value)}
                fullWidth
                variant="outlined"
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "#f5f5f5",
                  },
                }}
              />

              <TextField
                label="Ano"
                type="number"
                value={formData.ano}
                onChange={(e) => handleInputChange("ano", e.target.value)}
                fullWidth
                variant="outlined"
                required
                inputProps={{ min: 1900, max: new Date().getFullYear() + 1 }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "#f5f5f5",
                  },
                }}
              />

              <TextField
                label="Matrícula"
                value={formData.matricula}
                onChange={(e) => handleInputChange("matricula", e.target.value)}
                fullWidth
                variant="outlined"
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "#f5f5f5",
                  },
                }}
              />

              <TextField
                label="Placa"
                value={formData.placa}
                onChange={(e) => handleInputChange("placa", e.target.value.toUpperCase())}
                fullWidth
                variant="outlined"
                required
                placeholder="ABC-1234"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "#f5f5f5",
                  },
                }}
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
                    borderRadius: 2,
                    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                    boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
                    "&:hover": {
                      background: "linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)",
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
                    borderRadius: 2,
                    borderColor: "#666",
                    color: "#666",
                    "&:hover": {
                      borderColor: "#333",
                      color: "#333",
                      backgroundColor: "rgba(0,0,0,0.04)",
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
