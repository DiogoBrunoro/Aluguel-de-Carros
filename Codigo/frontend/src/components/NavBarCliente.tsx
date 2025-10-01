"use client"

import type React from "react"

import { useState } from "react"
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Avatar, Box, Link } from "@mui/material"
import { DirectionsCar, EventNote, AddCircle, Logout } from "@mui/icons-material"
import { useAuth } from "../hooks/useAuth"
import type { TelaAtiva } from "../types/types"

interface NavBarClienteProps {
    setTelaAtiva: (tela: TelaAtiva) => void
    telaAtiva: TelaAtiva
}

export default function NavBarCliente({ setTelaAtiva, telaAtiva }: NavBarClienteProps) {
    const { user, logout } = useAuth()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

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
                background: "linear-gradient(90deg, #1e3a8a, #2563eb)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Link component="button"
                    onClick={() => setTelaAtiva("home")}
                    underline="none"
                    sx={{ textDecoration: "none", color: "white" }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 1 }}>
                        <DirectionsCar /> Portal do Cliente
                    </Typography>
                </Link>

                <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
                    <Button
                        color="inherit"
                        startIcon={<DirectionsCar />}
                        onClick={() => setTelaAtiva("carros-disponiveis")}
                        sx={{
                            fontWeight: telaAtiva === "carros-disponiveis" ? 700 : 500,
                            borderBottom: telaAtiva === "carros-disponiveis" ? "2px solid white" : "none",
                        }}
                    >
                        Carros Disponíveis
                    </Button>
                    <Button
                        color="inherit"
                        startIcon={<EventNote />}
                        onClick={() => setTelaAtiva("meus-alugueis")}
                        sx={{
                            fontWeight: telaAtiva === "meus-alugueis" ? 700 : 500,
                            borderBottom: telaAtiva === "meus-alugueis" ? "2px solid white" : "none",
                        }}
                    >
                        Meus Aluguéis
                    </Button>
                    <Button
                        color="inherit"
                        startIcon={<AddCircle />}
                        onClick={() => setTelaAtiva("solicitar-aluguel")}
                        sx={{
                            fontWeight: telaAtiva === "solicitar-aluguel" ? 700 : 500,
                            borderBottom: telaAtiva === "solicitar-aluguel" ? "2px solid white" : "none",
                        }}
                    >
                        Solicitar Aluguel
                    </Button>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography variant="body2" sx={{ display: { xs: "none", sm: "block" } }}>
                        {user?.nome}
                    </Typography>
                    <IconButton onClick={handleMenu} sx={{ color: "white" }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: "#3b82f6" }}>{user?.nome?.charAt(0).toUpperCase()}</Avatar>
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
