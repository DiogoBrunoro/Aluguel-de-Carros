"use client"

import type React from "react"
import { useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Stack,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"

import { Home as HomeIcon, Person, DirectionsCar, Add, Assignment, Menu as MenuIcon, Home } from "@mui/icons-material"

type TelaAtiva = "home" | "consulta-clientes" | "consulta-carros" | "cadastro-carros" | "gerenciamento-aluguel"

interface NavbarProps {
  setTelaAtiva: (tela: TelaAtiva) => void
  telaAtiva: TelaAtiva
}

interface NavLink {
  text: string
  icon: React.ReactNode
  tela: TelaAtiva
}

export default function Navbar({ setTelaAtiva, telaAtiva }: NavbarProps) {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  const handleNavigateAndCloseDrawer = (tela: TelaAtiva) => {
    setTelaAtiva(tela)
    setDrawerOpen(false)
  }

  const navLinks: NavLink[] = [
    { text: "Home", icon: <Home />, tela: "home" },
    { text: "Clientes", icon: <Person />, tela: "consulta-clientes" },
    { text: "Carros", icon: <DirectionsCar />, tela: "consulta-carros" },
    { text: "Cadastrar", icon: <Add />, tela: "cadastro-carros" },
    { text: "Aluguéis", icon: <Assignment />, tela: "gerenciamento-aluguel" },
  ]

  const drawerContent = (
    <List>
      <ListItemButton onClick={() => handleNavigateAndCloseDrawer("home")}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Início" />
      </ListItemButton>
      {navLinks.map((link) => (
        <ListItemButton
          key={link.tela}
          onClick={() => handleNavigateAndCloseDrawer(link.tela)}
          selected={telaAtiva === link.tela}
        >
          <ListItemIcon>{link.icon}</ListItemIcon>
          <ListItemText primary={link.text} />
        </ListItemButton>
      ))}
    </List>
  )

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: "rgba(15, 15, 15, 0.9)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.7)",
        }}
      >
        <Toolbar>
          {isMobile ? (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          ) : (
            <IconButton edge="start" color="inherit" onClick={() => setTelaAtiva("home")} sx={{ mr: 2 }}>
              <HomeIcon />
            </IconButton>
          )}

          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Sistema de Aluguel de Carros
          </Typography>

          {!isMobile && (
            <Stack direction="row" spacing={1}>
              {navLinks.map((link) => (
                <Button
                  key={link.tela}
                  color="inherit"
                  startIcon={link.icon}
                  onClick={() => setTelaAtiva(link.tela)}
                  sx={{
                    backgroundColor: telaAtiva === link.tela ? "rgba(255,255,255,0.2)" : "transparent",
                    borderRadius: 2,
                  }}
                >
                  {link.text}
                </Button>
              ))}
            </Stack>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: { width: 240, background: "linear-gradient(135deg, #e0f2f7 0%, #c1e8f3 100%)" },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  )
}
