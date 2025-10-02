"use client"

import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
  Stack,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Grid, 
} from "@mui/material"
import {
  Edit,
  Delete,
  Save,
  Cancel,
  Add,
  Person,
  DirectionsCar,
  CalendarToday,
  AttachMoney,
  CheckCircle,
  Pending,
  Cancel as CancelIcon,
} from "@mui/icons-material"
// import "../styles/PageClient.css"
import InputClient from "../../components/InputClient"
import { Aluguel, Carro, Cliente, StatusAluguel } from "../../types/types"

//   const carregarDados = () => {
//     // Carregar aluguéis
//     fetch("/api/alugueis")
//       .then((res) => res.json())
//       .then((data) => setAlugueis(data))
//       .catch((err) => console.error("Erro ao buscar aluguéis:", err))

//     // Carregar clientes
//     fetch("/api/clientes")
//       .then((res) => res.json())
//       .then((data) => setClientes(data))
//       .catch((err) => console.error("Erro ao buscar clientes:", err))

//     // Carregar carros
//     fetch("/api/carros")
//       .then((res) => res.json())
//       .then((data) => setCarros(data))
//       .catch((err) => console.error("Erro ao buscar carros:", err))
//   }

//   useEffect(() => {
//     carregarDados()
//   }, [])

interface NovoAluguelForm {
  cliente_id: string
  carroId: string
  data_inicio: string
  data_fim: string
  valorDiario: string
  status: StatusAluguel
}

interface StatusStyle {
  bg: string
  color: string
}

export default function GerenciamentoAluguel() {
  const [alugueis, setAlugueis] = useState<Aluguel[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [carros, setCarros] = useState<Carro[]>([])
  const [busca, setBusca] = useState<string>("")
  const [dialogAberto, setDialogAberto] = useState<boolean>(false)
  const [novoAluguel, setNovoAluguel] = useState<NovoAluguelForm>({
    cliente_id: "",
    carroId: "",
    data_inicio: "",
    data_fim: "",
    valorDiario: "",
    status: "pendente",
  })

  const getStatusColor = (status: StatusAluguel): StatusStyle => {
    switch (status) {
      case "ativo":
        return { bg: "#dcfce7", color: "#166534" }
      case "pendente":
        return { bg: "#fef9c3", color: "#854d0e" }
      case "cancelado":
        return { bg: "#fee2e2", color: "#991b1b" }
      case "finalizado":
        return { bg: "#dbeafe", color: "#1e3a8a" }
      default:
        return { bg: "#f3f4f6", color: "#374151" }
    }
  }


  const getStatusIcon = (status: StatusAluguel) => {
    switch (status) {
      case "ativo":
        return <CheckCircle fontSize="small" />
      case "pendente":
        return <Pending fontSize="small" />
      case "cancelado":
        return <CancelIcon fontSize="small" />
      case "finalizado":
        return <CheckCircle fontSize="small" />
      default:
        return <Pending fontSize="small" />
    }
  }

  const calcularValorTotal = (data_inicio: string, data_fim: string, valorDiario: string): number => {
    if (!data_inicio || !data_fim || !valorDiario) return 0
    const inicio = new Date(data_inicio)
    const fim = new Date(data_fim)
    const dias = Math.ceil((fim.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24))
    return dias * Number.parseFloat(valorDiario)
  }
  const aluguelsFiltrados = alugueis.filter((a) => {
    const cliente = clientes.find((c) => c.id === a.cliente_id)
    const carro = carros.find((c) => c.id === a.carroId)
    const nomeCliente = cliente ? cliente.nome.toLowerCase() : ""
    const marcaCarro = carro ? carro.marca.toLowerCase() : ""
    const modeloCarro = carro ? carro.modelo.toLowerCase() : ""

    return (
      nomeCliente.includes(busca.toLowerCase()) ||
      marcaCarro.includes(busca.toLowerCase()) ||
      modeloCarro.includes(busca.toLowerCase())
    )
  })

  return (
    <div className="screen-center">
      <div className="client-card">
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Gerenciamento de Aluguéis
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setDialogAberto(true)}
            sx={{
              borderRadius: 2,
              fontWeight: 600,
              background: "linear-gradient(90deg,#22c55e,#16a34a)",
              "&:hover": { background: "linear-gradient(90deg,#15803d,#166534)" },
            }}
          >
            Novo Aluguel
          </Button>
        </Stack>

        <InputClient
          placeholder="Buscar aluguel (cliente, marca ou modelo do carro)"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <Grid container direction="column" spacing={2} sx={{ mt: 2 }}>
          {aluguelsFiltrados.length > 0 ? (
            aluguelsFiltrados.map((a) => {
              const cliente = clientes.find((c) => c.id === a.cliente_id)
              const carro = carros.find((c) => c.id === a.carroId)
              const status = getStatusColor(a.status)

              return (
                <Grid>
                  <Card
                    sx={{
                      borderRadius: 4,
                      background: "#ffffff",
                      boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                      color: "#111827",
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          Aluguel #{a.id}
                        </Typography>
                        <Chip
                          icon={getStatusIcon(a.status)}
                          label={a.status.toUpperCase()}
                          sx={{
                            backgroundColor: status.bg,
                            color: status.color,
                            fontWeight: 600,
                            px: 1,
                          }}
                        />
                      </Stack>

                      <Divider sx={{ mb: 2 }} />

                      <Stack spacing={1.2}>
                        <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Person fontSize="small" />
                          <strong>Cliente:</strong> {cliente ? cliente.nome : "Cliente não encontrado"}
                        </Typography>
                        <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <DirectionsCar fontSize="small" />
                          <strong>Carro:</strong> {carro ? `${carro.marca} ${carro.modelo} - ${carro.placa}` : "Carro não encontrado"}
                        </Typography>
                        <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <CalendarToday fontSize="small" />
                          <strong>Período:</strong> {new Date(a.data_inicio).toLocaleDateString()} até {new Date(a.data_fim).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <AttachMoney fontSize="small" />
                          <strong>Valor:</strong> R$ {Number.parseFloat(a.valorDiario).toFixed(2)}/dia —
                          <strong> Total: R$ {calcularValorTotal(a.data_inicio, a.data_fim, a.valorDiario).toFixed(2)}</strong>
                        </Typography>
                      </Stack>
                    </CardContent>

                    <Stack
                      direction="row"
                      justifyContent="flex-end"
                      spacing={1}
                      sx={{ px: 2, py: 1.5, borderTop: "1px solid #e5e7eb" }}
                    >
                      <IconButton sx={{ color: "#2563eb" }}>
                        <Edit />
                      </IconButton>
                      <IconButton sx={{ color: "#ef4444" }}>
                        <Delete />
                      </IconButton>
                    </Stack>
                  </Card>
                </Grid>
              )
            })
          ) : (
            <Typography variant="body1">Nenhum aluguel encontrado.</Typography>
          )}
        </Grid>

        {/* Dialog para novo aluguel */}
        {/* Dialog para novo aluguel */}
        <Dialog open={dialogAberto} onClose={() => setDialogAberto(false)} maxWidth="sm" fullWidth>
          {/* Cabeçalho moderno */}
          <DialogTitle
            sx={{
              fontWeight: 700,
              textAlign: "center",
              py: 2,
              background: "linear-gradient(90deg,#2563eb,#1d4ed8)", // azul
              color: "white",
              borderTopLeftRadius: 2,
              borderTopRightRadius: 2,
            }}
          >
            Novo Aluguel
          </DialogTitle>

          {/* Conteúdo com espaçamento maior */}
          <DialogContent sx={{ p: 4, backgroundColor: "#f9fafb", marginTop: 5 }}>
            <Stack spacing={3}>
              {/* Seletores lado a lado */}
              <Stack direction="row" spacing={2}>
                <FormControl fullWidth>
                  <InputLabel>Cliente</InputLabel>
                  <Select
                    value={novoAluguel.cliente_id}
                    onChange={(e) =>
                      setNovoAluguel({ ...novoAluguel, cliente_id: e.target.value })
                    }
                    sx={{
                      borderRadius: 2,
                      background: "white",
                    }}
                  >
                    {clientes.map((c) => (
                      <MenuItem key={c.id} value={c.id}>
                        {c.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Carro</InputLabel>
                  <Select
                    value={novoAluguel.carroId}
                    onChange={(e) =>
                      setNovoAluguel({ ...novoAluguel, carroId: e.target.value })
                    }
                    sx={{
                      borderRadius: 2,
                      background: "white",
                    }}
                  >
                    {carros.map((c) => (
                      <MenuItem key={c.id} value={c.id}>
                        {c.marca} {c.modelo} - {c.placa}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>

              {/* Datas lado a lado */}
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Data Início"
                  type="date"
                  value={novoAluguel.data_inicio}
                  onChange={(e) =>
                    setNovoAluguel({ ...novoAluguel, data_inicio: e.target.value })
                  }
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      background: "white",
                    },
                  }}
                />
                <TextField
                  label="Data Fim"
                  type="date"
                  value={novoAluguel.data_fim}
                  onChange={(e) =>
                    setNovoAluguel({ ...novoAluguel, data_fim: e.target.value })
                  }
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      background: "white",
                    },
                  }}
                />
              </Stack>

              {/* Valor */}
              <TextField
                label="Valor Diário (R$)"
                type="number"
                value={novoAluguel.valorDiario}
                onChange={(e) =>
                  setNovoAluguel({ ...novoAluguel, valorDiario: e.target.value })
                }
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    background: "white",
                  },
                }}
              />
            </Stack>
          </DialogContent>

          {/* Rodapé com botões */}
          <DialogActions
            sx={{
              px: 3,
              pb: 3,
              backgroundColor: "#f9fafb",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <Button
              onClick={() => setDialogAberto(false)}
              sx={{
                borderRadius: 2,
                fontWeight: 600,
                color: "#374151",
                border: "1px solid #d1d5db",
                "&:hover": { backgroundColor: "#f3f4f6" },
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={() => { }}
              variant="contained"
              sx={{
                borderRadius: 2,
                fontWeight: 600,
                px: 3,
                background: "linear-gradient(90deg,#2563eb,#1d4ed8)",
                boxShadow: "0 4px 14px rgba(37,99,235,0.4)",
                "&:hover": { background: "linear-gradient(90deg,#1e3a8a,#1d4ed8)" },
              }}
            >
              Criar Aluguel
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    </div>
  )
}