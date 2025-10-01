"use client"

import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  Chip,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"
import { DirectionsCar, DateRange, LocalOffer, CheckCircle } from "@mui/icons-material"
import { Carro } from "../../types/types"

export default function CarrosDisponiveis() {
  const [carros, setCarros] = useState<Carro[]>([])
  const [carroSelecionado, setCarroSelecionado] = useState<Carro | null>(null)
  const [dialogAberto, setDialogAberto] = useState(false)

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



  const handleVerDetalhes = (carro: Carro) => {
    setCarroSelecionado(carro)
    setDialogAberto(true)
  }

  const carrosDisponiveis = carros.filter((c) => c.disponivel)

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
        <DirectionsCar sx={{ fontSize: 40, color: "#2563eb" }} />
        Carros Disponíveis para Aluguel
      </Typography>

      <Grid container spacing={3}>
        {carrosDisponiveis.length > 0 ? (
          carrosDisponiveis.map((carro) => (
            <Grid>
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
                  },
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  component="img"
                  src={carro.imagemUrl || "/placeholder.png"}
                  alt={`${carro.marca} ${carro.modelo}`}
                  sx={{
                    width: "100%",
                    height: 200,
                    objectFit: "cover",
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                  }}
                />
                <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {carro.marca} {carro.modelo}
                    </Typography>
                    <Chip
                      icon={<CheckCircle />}
                      label="Disponível"
                      size="small"
                      sx={{
                        backgroundColor: "#dcfce7",
                        color: "#166534",
                        fontWeight: 600,
                      }}
                    />
                  </Box>

                  <Box sx={{ mb: 2, flexGrow: 1 }}>
                    <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <DateRange fontSize="small" sx={{ color: "#9333ea" }} />
                      <strong>Ano:</strong> {carro.ano}
                    </Typography>
                    <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <LocalOffer fontSize="small" sx={{ color: "#2563eb" }} />
                      <strong>Placa:</strong> {carro.placa}
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleVerDetalhes(carro)}
                    sx={{
                      borderRadius: 2,
                      fontWeight: 600,
                      background: "linear-gradient(90deg, #2563eb, #1d4ed8)",
                      "&:hover": {
                        background: "linear-gradient(90deg, #1e40af, #1d4ed8)",
                      },
                    }}
                  >
                    Ver Detalhes
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid>
            <Typography variant="body1" sx={{ textAlign: "center", py: 4 }}>
              Nenhum carro disponível no momento.
            </Typography>
          </Grid>
        )}
      </Grid>

      {/* Dialog de Detalhes */}
      <Dialog open={dialogAberto} onClose={() => setDialogAberto(false)} maxWidth="sm" fullWidth>
        {carroSelecionado && (
          <>
            <DialogTitle sx={{ fontWeight: 700, fontSize: "1.5rem" }}>
              {carroSelecionado.marca} {carroSelecionado.modelo}
            </DialogTitle>
            <DialogContent>
              <Box
                component="img"
                src={carroSelecionado.imagemUrl || "/placeholder.png"}
                alt={`${carroSelecionado.marca} ${carroSelecionado.modelo}`}
                sx={{ width: "100%", borderRadius: 2, mb: 2 }}
              />
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Ano:</strong> {carroSelecionado.ano}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Placa:</strong> {carroSelecionado.placa}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Matrícula:</strong> {carroSelecionado.matricula}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogAberto(false)}>Fechar</Button>
              <Button
                variant="contained"
                sx={{
                  background: "linear-gradient(90deg, #22c55e, #16a34a)",
                  "&:hover": { background: "linear-gradient(90deg, #15803d, #166534)" },
                }}
              >
                Solicitar Aluguel
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  )
}
