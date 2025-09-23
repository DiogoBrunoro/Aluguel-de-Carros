"use client";

import React, { useState } from "react"; // Importar useState
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Stack,
  Drawer,         // <-- Importar Drawer
  List,           // <-- Importar List
  ListItemButton, // <-- Importar ListItemButton
  ListItemIcon,   // <-- Importar ListItemIcon
  ListItemText,   // <-- Importar ListItemText
  useMediaQuery,  // <-- Importar useMediaQuery
} from "@mui/material";
import { useTheme } from "@mui/material/styles"; // Importar useTheme para usar media queries

import {
  Home as HomeIcon, // Renomeado para evitar conflito com o nome do prop 'Home' da rota
  Person,
  DirectionsCar,
  Add,
  Assignment,
  Menu as MenuIcon,
  Home, // <-- Importar MenuIcon
} from "@mui/icons-material";

export default function Navbar( { setTelaAtiva, telaAtiva }) {
  const [drawerOpen, setDrawerOpen] = useState(false); 
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); 

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavigateAndCloseDrawer = (tela) => {
    setTelaAtiva(tela);
    setDrawerOpen(false); 
  };

  // Links da navegação
  const navLinks = [
    { text: "Home", icon: <Home />, tela: "home" },
    { text: "Clientes", icon: <Person />, tela: "consulta-clientes" },
    { text: "Carros", icon: <DirectionsCar />, tela: "consulta-carros" },
    { text: "Cadastrar", icon: <Add />, tela: "cadastro-carros" },
    { text: "Aluguéis", icon: <Assignment />, tela: "gerenciamento-aluguel" },
  ];

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
  );

  return (
    <>
     <AppBar
        position="static"
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar>
          {isMobile ? (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
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
          sx: { width: 240, background: 'linear-gradient(135deg, #e0f2f7 0%, #c1e8f3 100%)' } 
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}