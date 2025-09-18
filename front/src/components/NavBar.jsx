import * as React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar({ title = "Aluguel de Carros", links = [], rightSlot }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backdropFilter: "blur(10px)",
          background:
            "linear-gradient(180deg, rgba(0,0,0,.35), rgba(0,0,0,.15))",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Toolbar sx={{ maxWidth: 1200, mx: "auto", width: "100%" }}>
          {/* Menu mobile */}
          <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
            <IconButton
              color="inherit"
              onClick={handleOpen}
              aria-label="menu"
              edge="start"
              size="large"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Marca */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              letterSpacing: 0.4,
              flexGrow: { xs: 1, md: 0 },
            }}
          >
            {title}
          </Typography>

          {/* Links desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, ml: 3 }}>
            {links.map((l) => (
              <Button
                key={l.label}
                color="inherit"
                onClick={() => (l.onClick ? l.onClick() : (window.location.href = l.href || "#"))}
                sx={{ opacity: 0.9, "&:hover": { opacity: 1 } }}
              >
                {l.label}
              </Button>
            ))}
          </Box>

          {/* Slot à direita (ex: Login/Avatar) */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {rightSlot}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Menu mobile */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 220,
            background: "rgba(15,27,45,.95)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,.06)",
          },
        }}
      >
        <Typography sx={{ px: 2, py: 1, fontWeight: 700 }}>{title}</Typography>
        <Divider sx={{ borderColor: "rgba(255,255,255,.06)" }} />
        {links.map((l) => (
          <MenuItem
            key={l.label}
            onClick={() => {
              handleClose();
              l.onClick ? l.onClick() : (window.location.href = l.href || "#");
            }}
          >
            {l.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}