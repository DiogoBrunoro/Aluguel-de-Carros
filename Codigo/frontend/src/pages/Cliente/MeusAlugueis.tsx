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
import { listAllAlugueis, updateAluguel } from "../../api/aluguel"

interface StatusStyle {
  bg: string
  color: string
}

export default function MeusAlugueis() {
  const { user } = useAuth()
  const [alugueis, setAlugueis] = useState<Aluguel[]>([])
  const [carros, setCarros] = useState<Carro[]>([])

  useEffect(() => {

    async function fetchAluguel() {
      const data = await listAllAlugueis()
      setAlugueis(data)
    }

    fetchAluguel()
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

  const calcularValorTotal = (data_inicio: string, data_fim: string, valorDiario: string): number => {
    const inicio = new Date(data_inicio)
    const fim = new Date(data_fim)
    const dias = Math.ceil((fim.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24))
    return dias * Number.parseFloat(valorDiario)
  }

  const handleCancelar = async (id: string) => {
      const data = await updateAluguel({ id, status: "cancelado" })

      if(!data){
        throw new Error("Erro ao cancelar aluguel")
      }

      type NewAluguel = Omit<Aluguel, 'status'> & { status: StatusAluguel };

      const newAlugueis = alugueis.map((aluguel) => {
        if (aluguel.id === id) {
          return { ...aluguel, status: "cancelado" } as NewAluguel 
        }
        return aluguel
      })

      setAlugueis(newAlugueis)
  }

  const formatData = (data: string) => {
    const date = new Date(data);

    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); 
    const year = date.getUTCFullYear();
    
    return `${day}/${month}/${year}`;
};

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Meus Aluguéis
      </Typography>

      <Grid container direction="column" spacing={3}>
        {alugueis.length > 0 ? (
          alugueis.map((aluguel) => {
            const carro = aluguel.automovel
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
                        Aluguel #{aluguel.automovel.matricula}
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
                        <strong>Período:</strong> {formatData(aluguel.data_inicio)} até{" "}
                        {formatData(aluguel.data_fim)}
                      </Typography>
                      <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <AttachMoney fontSize="small" />
                        <strong>Valor:</strong> R$ {Number.parseFloat(aluguel.valorDiario).toFixed(2)}/dia —
                        <strong>
                          {" "}
                          Total: R${" "}
                          {calcularValorTotal(aluguel.data_inicio, aluguel.data_fim, aluguel.valorDiario).toFixed(2)}
                        </strong>
                      </Typography>
                    </Stack>

                    {aluguel.status === "pendente" && (
                      <Button
                        variant="outlined"
                        color="error"
                        sx={{ mt: 2 }}
                        onClick={() => handleCancelar(aluguel?.id || "")}
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
