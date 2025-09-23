// src/components/HomeDashboard.jsx
"use client";

import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { Person, DirectionsCar, Add, Assignment } from "@mui/icons-material";
import "../styles/PageClient.css";

export default function HomeDashboard({ onNavigate }) {
  return (
    <div className="screen-center">
      <div className="client-card">
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            color: "#333",
            fontWeight: 700,
            mb: 2,
            textShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          Sistema de Aluguel de Carros
        </Typography>

        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            color: "#666",
            mb: 4,
            fontWeight: 400,
          }}
        >
          Gerencie clientes, carros e aluguéis de forma eficiente
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                cursor: "pointer",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
              }}
              onClick={() => onNavigate("consulta-clientes")}
            >
              <CardContent sx={{ p: 4, textAlign: "center" }}>
                <Person sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  Consultar Clientes
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Visualize, edite e gerencie informações dos clientes
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                color: "white",
                cursor: "pointer",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
              }}
              onClick={() => onNavigate("consulta-carros")}
            >
              <CardContent sx={{ p: 4, textAlign: "center" }}>
                <DirectionsCar sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  Consultar Carros
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Visualize e gerencie a frota de veículos
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                color: "white",
                cursor: "pointer",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
              }}
              onClick={() => onNavigate("cadastro-carros")}
            >
              <CardContent sx={{ p: 4, textAlign: "center" }}>
                <Add sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  Cadastrar Carros
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Adicione novos veículos à frota
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
                color: "white",
                cursor: "pointer",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
              }}
              onClick={() => onNavigate("gerenciamento-aluguel")}
            >
              <CardContent sx={{ p: 4, textAlign: "center" }}>
                <Assignment sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  Gerenciar Aluguéis
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Controle pedidos e contratos de aluguel
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}