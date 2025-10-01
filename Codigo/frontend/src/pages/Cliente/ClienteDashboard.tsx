"use client"

import { useState } from "react"
import NavBarCliente from "../../components/NavBarCliente"
import CarrosDisponiveis from "./CarrosDisponiveis"
import MeusAlugueis from "./MeusAlugueis"
import SolicitarAluguel from "./SolicitarAluguel"
import type { TelaAtiva } from "../../types/types"
import { Box, Container, Typography, Grid, Card, CardContent } from "@mui/material"
import { DirectionsCar, EventNote, AddCircle } from "@mui/icons-material"

export default function ClienteDashboard() {
  const [telaAtiva, setTelaAtiva] = useState<TelaAtiva>("home")
  

  const renderTelaContent = () => {
    switch (telaAtiva) {
      case "carros-disponiveis":
        return <CarrosDisponiveis />
      case "meus-alugueis":
        return <MeusAlugueis />
      case "solicitar-aluguel":
        return <SolicitarAluguel />
      case "home":
      default:
        return (
          <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, textAlign: "center" }}>
              Bem-vindo ao Portal do Cliente
            </Typography>
            <Grid container spacing={3}>
              <Grid>
                <Card
                  sx={{
                    cursor: "pointer",
                    transition: "transform 0.2s",
                    "&:hover": { transform: "translateY(-4px)" },
                    background: "linear-gradient(135deg, #2563eb, #1e40af)",
                    color: "white",
                  }}
                  onClick={() => setTelaAtiva("carros-disponiveis")}
                >
                  <CardContent sx={{ textAlign: "center", py: 4 }}>
                    <DirectionsCar sx={{ fontSize: 60, mb: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Carros Disponíveis
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
                      Veja todos os carros disponíveis para aluguel
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid>
                <Card
                  sx={{
                    cursor: "pointer",
                    transition: "transform 0.2s",
                    "&:hover": { transform: "translateY(-4px)" },
                    background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                    color: "white",
                  }}
                  onClick={() => setTelaAtiva("meus-alugueis")}
                >
                  <CardContent sx={{ textAlign: "center", py: 4 }}>
                    <EventNote sx={{ fontSize: 60, mb: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Meus Aluguéis
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
                      Acompanhe seus aluguéis ativos e histórico
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid>
                <Card
                  sx={{
                    cursor: "pointer",
                    transition: "transform 0.2s",
                    "&:hover": { transform: "translateY(-4px)" },
                    background: "linear-gradient(135deg, #22c55e, #16a34a)",
                    color: "white",
                  }}
                  onClick={() => setTelaAtiva("solicitar-aluguel")}
                >
                  <CardContent sx={{ textAlign: "center", py: 4 }}>
                    <AddCircle sx={{ fontSize: 60, mb: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Solicitar Aluguel
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
                      Faça uma nova solicitação de aluguel
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        )
    }
  }

  return (
    <Box>
      <NavBarCliente setTelaAtiva={setTelaAtiva} telaAtiva={telaAtiva} />
      {renderTelaContent()}
    </Box>
  )
}
