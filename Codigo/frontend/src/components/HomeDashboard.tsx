"use client";

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Stack,
  Box,
} from "@mui/material";
import {
  Person,
  DirectionsCar,
  Add,
  Assignment,
  MonetizationOn,
} from "@mui/icons-material";
import "../styles/PageClient.css";

export default function HomeDashboard({ onNavigate }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: { xs: 3, md: 6 },
        color: "white",
      }}
    >
      {/* HERO */}
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            mb: 2,
            background: "white",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Sistema de Aluguel de Carros
        </Typography>
        <Typography variant="h6" color="rgba(255,255,255,0.7)" maxWidth="600px" mx="auto">
          Gerencie clientes, carros e aluguéis de forma rápida, inteligente e
          moderna.
        </Typography>
      </Box>

      {/* KPIs */}
      <Grid container spacing={3} mb={6}>
        {[
          { icon: <Person />, value: "128", label: "Cliendtes" },
          { icon: <DirectionsCar />, value: "45", label: "Carros" },
          { icon: <Assignment />, value: "23", label: "Aluguéis ativos" },
          { icon: <MonetizationOn />, value: "R$ 15.400", label: "Receita Mensal" },
        ].map((kpi, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Box
              sx={{
                borderRadius: 4,
                p: 3,
                textAlign: "center",
                // backdropFilter: "blur(12px)",
                // background: "rgba(248, 245, 245, 0.1)",
                // border: "1px solid rgba(255,255,255,0.15)",
                color: "white",
                transition: "transform 0.3s",
                "&:hover": { transform: "translateY(-5px)" },
                minHeight: 160, // garante altura fixa
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%", // ocupa toda a largura da coluna
              }}
            >
              <Stack spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {kpi.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {kpi.value}
                </Typography>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                  {kpi.label}
                </Typography>
              </Stack>
            </Box>

          </Grid>
        ))}
      </Grid>

      {/* Navigation */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 4,
              background: "linear-gradient(135deg, #2563eb, #3b82f6)",
              color: "white",
              cursor: "pointer",
              transition: "all 0.3s",
              "&:hover": { transform: "translateY(-6px)", boxShadow: "0 10px 25px rgba(0,0,0,0.3)" },
            }}
            onClick={() => onNavigate("consulta-clientes")}
          >
            <CardContent sx={{ p: 4, textAlign: "center" }}>
              <Person sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h5" fontWeight={700}>Consultar Clientes</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Visualize e gerencie dados dos clientes
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 4,
              background: "linear-gradient(135deg, #ec4899, #db2777)",
              color: "white",
              cursor: "pointer",
              transition: "all 0.3s",
              "&:hover": { transform: "translateY(-6px)", boxShadow: "0 10px 25px rgba(0,0,0,0.3)" },
            }}
            onClick={() => onNavigate("consulta-carros")}
          >
            <CardContent sx={{ p: 4, textAlign: "center" }}>
              <DirectionsCar sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h5" fontWeight={700}>Consultar Carros</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Gerencie a frota de veículos cadastrados
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 4,
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              color: "white",
              cursor: "pointer",
              transition: "all 0.3s",
              "&:hover": { transform: "translateY(-6px)", boxShadow: "0 10px 25px rgba(0,0,0,0.3)" },
            }}
            onClick={() => onNavigate("cadastro-carros")}
          >
            <CardContent sx={{ p: 4, textAlign: "center" }}>
              <Add sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h5" fontWeight={700}>Cadastrar Carros</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Adicione novos veículos de forma rápida
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 4,
              background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
              color: "white",
              cursor: "pointer",
              transition: "all 0.3s",
              "&:hover": { transform: "translateY(-6px)", boxShadow: "0 10px 25px rgba(0,0,0,0.3)" },
            }}
            onClick={() => onNavigate("gerenciamento-aluguel")}
          >
            <CardContent sx={{ p: 4, textAlign: "center" }}>
              <Assignment sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h5" fontWeight={700}>Gerenciar Aluguéis</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Controle e acompanhe os contratos de aluguel
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
