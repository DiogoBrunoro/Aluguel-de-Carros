"use client"

import { useState } from "react"
import NavBarAgente from "../../components/NavBarAgente"
import ConsultaClientes from "./ConsultaClientes"
import ConsultaCarros from "./ConsultaCarros"
import CadastroCarros from "./CadastroCarros"
import GerenciamentoAluguel from "./GerenciaAlugueis"
import type { TelaAtiva } from "../../types/types"
import { Box, Container, Typography, Grid, Card, CardContent } from "@mui/material"
import { People, DirectionsCar, AddCircle, EventNote } from "@mui/icons-material"

export default function AgenteDashboard() {
  const [telaAtiva, setTelaAtiva] = useState<TelaAtiva>("home")

  const renderTelaContent = () => {
    switch (telaAtiva) {
      case "consulta-clientes":
        return <ConsultaClientes />
      case "consulta-carros":
        return <ConsultaCarros />
      case "cadastro-carros":
        return <CadastroCarros />
      case "gerenciamento-aluguel":
        return <GerenciamentoAluguel />
      case "home":
      default:
        return (
          <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, textAlign: "center" }}>
              Painel de Controle do Agente
            </Typography>
            <Grid container spacing={3}>
              <Grid>
                <Card
                  sx={{
                    cursor: "pointer",
                    transition: "transform 0.2s",
                    "&:hover": { transform: "translateY(-4px)" },
                    background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                    color: "white",
                  }}
                  onClick={() => setTelaAtiva("consulta-clientes")}
                >
                  <CardContent sx={{ textAlign: "center", py: 4 }}>
                    <People sx={{ fontSize: 60, mb: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Clientes
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
                      Gerenciar clientes
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
                    background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                    color: "white",
                  }}
                  onClick={() => setTelaAtiva("consulta-carros")}
                >
                  <CardContent sx={{ textAlign: "center", py: 4 }}>
                    <DirectionsCar sx={{ fontSize: 60, mb: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Carros
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
                      Ver e editar carros
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
                  onClick={() => setTelaAtiva("cadastro-carros")}
                >
                  <CardContent sx={{ textAlign: "center", py: 4 }}>
                    <AddCircle sx={{ fontSize: 60, mb: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Cadastrar Carro
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
                      Adicionar novo carro
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
                    background: "linear-gradient(135deg, #f59e0b, #d97706)",
                    color: "white",
                  }}
                  onClick={() => setTelaAtiva("gerenciamento-aluguel")}
                >
                  <CardContent sx={{ textAlign: "center", py: 4 }}>
                    <EventNote sx={{ fontSize: 60, mb: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Aluguéis
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
                      Aprovar e gerenciar
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
      <NavBarAgente setTelaAtiva={setTelaAtiva} telaAtiva={telaAtiva} />
      {renderTelaContent()}
    </Box>
  )
}
