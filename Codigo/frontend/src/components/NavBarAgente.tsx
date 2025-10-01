"use client"

import type React from "react"

import { useState } from "react"
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Avatar, Box, Link } from "@mui/material"
import { DirectionsCar, EventNote, AddCircle, People, CarRental, Logout } from "@mui/icons-material"
import { useAuth } from "../hooks/useAuth"
import type { TelaAtiva } from "../types/types"
import { useNavigate } from "react-router-dom"

interface NavBarAgenteProps {
    setTelaAtiva: (tela: TelaAtiva) => void
    telaAtiva: TelaAtiva
}

export default function NavBarAgente({ setTelaAtiva, telaAtiva }: NavBarAgenteProps) {
    const { user, logout } = useAuth()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const navigate = useNavigate()

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = () => {
        logout()
        handleClose()
    }

    return (
        <AppBar
            position="sticky"
            sx={{
                background: "linear-gradient(90deg, #15803d, #22c55e)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Link component="button"
                    onClick={() => setTelaAtiva("home")}
                    underline="none"
                    sx={{ textDecoration: "none", color: "white" }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 1 }}>
                        <CarRental /> Portal do Agente
                    </Typography>
                </Link>
                <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
                    <Button
                        color="inherit"
                        startIcon={<People />}
                        onClick={() => setTelaAtiva("consulta-clientes")}
                        sx={{
                            fontWeight: telaAtiva === "consulta-clientes" ? 700 : 500,
                            borderBottom: telaAtiva === "consulta-clientes" ? "2px solid white" : "none",
                        }}
                    >
                        Clientes
                    </Button>
                    <Button
                        color="inherit"
                        startIcon={<DirectionsCar />}
                        onClick={() => setTelaAtiva("consulta-carros")}
                        sx={{
                            fontWeight: telaAtiva === "consulta-carros" ? 700 : 500,
                            borderBottom: telaAtiva === "consulta-carros" ? "2px solid white" : "none",
                        }}
                    >
                        Carros
                    </Button>
                    <Button
                        color="inherit"
                        startIcon={<AddCircle />}
                        onClick={() => setTelaAtiva("cadastro-carros")}
                        sx={{
                            fontWeight: telaAtiva === "cadastro-carros" ? 700 : 500,
                            borderBottom: telaAtiva === "cadastro-carros" ? "2px solid white" : "none",
                        }}
                    >
                        Cadastrar Carro
                    </Button>
                    <Button
                        color="inherit"
                        startIcon={<EventNote />}
                        onClick={() => setTelaAtiva("gerenciamento-aluguel")}
                        sx={{
                            fontWeight: telaAtiva === "gerenciamento-aluguel" ? 700 : 500,
                            borderBottom: telaAtiva === "gerenciamento-aluguel" ? "2px solid white" : "none",
                        }}
                    >
                        Aluguéis
                    </Button>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography variant="body2" sx={{ display: { xs: "none", sm: "block" } }}>
                        {user?.nome} (Agente)
                    </Typography>
                    <IconButton onClick={handleMenu} sx={{ color: "white" }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: "#16a34a" }}>{user?.nome?.charAt(0).toUpperCase()}</Avatar>
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                        <MenuItem onClick={handleLogout}>
                            <Logout sx={{ mr: 1 }} /> Sair
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
