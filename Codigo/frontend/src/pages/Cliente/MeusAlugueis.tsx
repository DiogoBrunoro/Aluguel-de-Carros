"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, Typography, Container, Grid, Chip, Stack, Divider, Button } from "@mui/material"
import {
  DirectionsCar,
  CalendarToday,
  AttachMoney,
  CheckCircle,
  Pending,
  Cancel as CancelIcon,
} from "@mui/icons-material"
import type { Aluguel, StatusAluguel, Carro } from "../../types/types"
import { useAuth } from "../../hooks/useAuth"

interface StatusStyle {
  bg: string
  color: string
}

export default function MeusAlugueis() {
  const { user } = useAuth()
  const [alugueis, setAlugueis] = useState<Aluguel[]>([])
  const [carros, setCarros] = useState<Carro[]>([])

  // Mock de dados
  const mockCarros: Carro[] = [
    {
      id: "car1",
      placa: "ABC-1234",
      matricula: "MV-001",
      ano: 2020,
      marca: "Toyota",
      modelo: "Corolla",
      imagemUrl: "https://www.comprecar.com.br/storage/news/featured/2Aw_A_xdWZC9Dne.jpg",
    },
  ]

  const mockAlugueis: Aluguel[] = [
    {
      id: "aluguel1",
      clienteId: user?.id || "cliente1",
      carroId: "car1",
      dataInicio: "2025-01-15",
      dataFim: "2025-01-20",
      valorDiario: "150.00",
      status: "pendente",
    },
  ]

  useEffect(() => {
    setCarros(mockCarros)
    setAlugueis(mockAlugueis)
  }, [])

  const getStatusColor = (status: StatusAluguel): StatusStyle => {
    switch (status) {
      case "ativo":
        return { bg: "#dcfce7", color: "#166534" }
      case "pendente":
        return { bg: "#fef9c3", color: "#854d0e" }
      case "cancelado":
        return { bg: "#fee2e2", color: "#991b1b" }
      case "finalizado":
        return { bg: "#dbeafe", color: "#1e3a8a" }
      default:
        return { bg: "#f3f4f6", color: "#374151" }
    }
  }

  const getStatusIcon = (status: StatusAluguel) => {
    switch (status) {
      case "ativo":
        return <CheckCircle fontSize="small" />
      case "pendente":
        return <Pending fontSize="small" />
      case "cancelado":
        return <CancelIcon fontSize="small" />
      case "finalizado":
        return <CheckCircle fontSize="small" />
      default:
        return <Pending fontSize="small" />
    }
  }

  const calcularValorTotal = (dataInicio: string, dataFim: string, valorDiario: string): number => {
    const inicio = new Date(dataInicio)
    const fim = new Date(dataFim)
    const dias = Math.ceil((fim.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24))
    return dias * Number.parseFloat(valorDiario)
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Meus Aluguéis
      </Typography>

      <Grid container direction="column" spacing={3}>
        {alugueis.length > 0 ? (
          alugueis.map((aluguel) => {
            const carro = carros.find((c) => c.id === aluguel.carroId)
            const status = getStatusColor(aluguel.status)

            return (
              <Grid>
                <Card
                  sx={{
                    borderRadius: 4,
                    background: "#ffffff",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Aluguel #{aluguel.id}
                      </Typography>
                      <Chip
                        icon={getStatusIcon(aluguel.status)}
                        label={aluguel.status.toUpperCase()}
                        sx={{
                          backgroundColor: status.bg,
                          color: status.color,
                          fontWeight: 600,
                          px: 1,
                        }}
                      />
                    </Stack>

                    <Divider sx={{ mb: 2 }} />

                    <Stack spacing={1.2}>
                      <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <DirectionsCar fontSize="small" />
                        <strong>Carro:</strong>{" "}
                        {carro ? `${carro.marca} ${carro.modelo} - ${carro.placa}` : "Carro não encontrado"}
                      </Typography>
                      <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <CalendarToday fontSize="small" />
                        <strong>Período:</strong> {new Date(aluguel.dataInicio).toLocaleDateString()} até{" "}
                        {new Date(aluguel.dataFim).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <AttachMoney fontSize="small" />
                        <strong>Valor:</strong> R$ {Number.parseFloat(aluguel.valorDiario).toFixed(2)}/dia —
                        <strong>
                          {" "}
                          Total: R${" "}
                          {calcularValorTotal(aluguel.dataInicio, aluguel.dataFim, aluguel.valorDiario).toFixed(2)}
                        </strong>
                      </Typography>
                    </Stack>

                    {aluguel.status === "pendente" && (
                      <Button
                        variant="outlined"
                        color="error"
                        sx={{ mt: 2 }}
                        onClick={() => console.log("Cancelar aluguel")}
                      >
                        Cancelar Solicitação
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            )
          })
        ) : (
          <Grid>
            <Typography variant="body1" sx={{ textAlign: "center", py: 4 }}>
              Você ainda não possui aluguéis.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  )
}
