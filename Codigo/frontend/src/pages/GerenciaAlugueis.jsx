"use client"

import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  Typography,
  Grid,
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
import "../styles/PageClient.css"
import InputClient from "../components/InputClient"

export default function GerenciamentoAluguel() {
  const [alugueis, setAlugueis] = useState([])
  const [clientes, setClientes] = useState([])
  const [carros, setCarros] = useState([])
  const [busca, setBusca] = useState("")
  const [editandoId, setEditandoId] = useState(null)
  const [formData, setFormData] = useState({})
  const [dialogAberto, setDialogAberto] = useState(false)
  const [novoAluguel, setNovoAluguel] = useState({
    clienteId: "",
    carroId: "",
    dataInicio: "",
    dataFim: "",
    valorDiario: "",
    status: "pendente",
  })

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

  const getStatusColor = (status) => {
    switch (status) {
      case "ativo":
        return "#4caf50"
      case "pendente":
        return "#ff9800"
      case "cancelado":
        return "#f44336"
      case "finalizado":
        return "#2196f3"
      default:
        return "#757575"
    }
  }

  const getStatusIcon = (status) => {
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

  const handleEditar = (aluguel) => {
    setEditandoId(aluguel.id)
    setFormData({ ...aluguel })
  }

  const handleCancelar = () => {
    setEditandoId(null)
    setFormData({})
  }

  const handleSalvar = async () => {
    try {
      await fetch(`/api/alugueis/${editandoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      setEditandoId(null)
      carregarDados()
    } catch (err) {
      console.error("Erro ao salvar aluguel:", err)
    }
  }

  const handleExcluir = async (id) => {
    if (!window.confirm("Deseja realmente excluir este aluguel?")) return
    try {
      await fetch(`/api/alugueis/${id}`, { method: "DELETE" })
      carregarDados()
    } catch (err) {
      console.error("Erro ao excluir aluguel:", err)
    }
  }

  const handleNovoAluguel = async () => {
    try {
      await fetch("/api/alugueis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoAluguel),
      })
      setDialogAberto(false)
      setNovoAluguel({
        clienteId: "",
        carroId: "",
        dataInicio: "",
        dataFim: "",
        valorDiario: "",
        status: "pendente",
      })
      carregarDados()
    } catch (err) {
      console.error("Erro ao criar aluguel:", err)
    }
  }

  const aluguelsFiltrados = alugueis.filter((a) => {
    const cliente = clientes.find((c) => c.id === a.clienteId)
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

  const calcularValorTotal = (dataInicio, dataFim, valorDiario) => {
    if (!dataInicio || !dataFim || !valorDiario) return 0
    const inicio = new Date(dataInicio)
    const fim = new Date(dataFim)
    const dias = Math.ceil((fim - inicio) / (1000 * 60 * 60 * 24))
    return dias * Number.parseFloat(valorDiario)
  }

  return (
    <div className="screen-center">
      <div className="client-card">
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <h2 className="client-title">Gerenciamento de Aluguéis</h2>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setDialogAberto(true)}
            sx={{
              borderRadius: 2,
              background: "linear-gradient(45deg, #4caf50 30%, #66bb6a 90%)",
              boxShadow: "0 3px 5px 2px rgba(76, 175, 80, .3)",
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
              const cliente = clientes.find((c) => c.id === a.clienteId)
              const carro = carros.find((c) => c.id === a.carroId)

              return (
                <Grid item xs={12} key={a.id}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                      background: "#E0E0E0",
                      color: "black",
                      width: "100%",
                      minHeight: 200,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    {editandoId === a.id ? (
                      <>
                        {/* Modo edição */}
                        <CardContent sx={{ p: 3 }}>
                          <Stack spacing={2}>
                            <Stack direction="row" spacing={2}>
                              <FormControl fullWidth size="small">
                                <InputLabel>Cliente</InputLabel>
                                <Select
                                  value={formData.clienteId ?? ""}
                                  onChange={(e) => setFormData({ ...formData, clienteId: e.target.value })}
                                >
                                  {clientes.map((c) => (
                                    <MenuItem key={c.id} value={c.id}>
                                      {c.nome}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>

                              <FormControl fullWidth size="small">
                                <InputLabel>Carro</InputLabel>
                                <Select
                                  value={formData.carroId ?? ""}
                                  onChange={(e) => setFormData({ ...formData, carroId: e.target.value })}
                                >
                                  {carros.map((c) => (
                                    <MenuItem key={c.id} value={c.id}>
                                      {c.marca} {c.modelo} - {c.placa}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Stack>

                            <Stack direction="row" spacing={2}>
                              <TextField
                                label="Data Início"
                                type="date"
                                value={formData.dataInicio ?? ""}
                                onChange={(e) => setFormData({ ...formData, dataInicio: e.target.value })}
                                fullWidth
                                size="small"
                                InputLabelProps={{ shrink: true }}
                              />

                              <TextField
                                label="Data Fim"
                                type="date"
                                value={formData.dataFim ?? ""}
                                onChange={(e) => setFormData({ ...formData, dataFim: e.target.value })}
                                fullWidth
                                size="small"
                                InputLabelProps={{ shrink: true }}
                              />
                            </Stack>

                            <Stack direction="row" spacing={2}>
                              <TextField
                                label="Valor Diário (R$)"
                                type="number"
                                value={formData.valorDiario ?? ""}
                                onChange={(e) => setFormData({ ...formData, valorDiario: e.target.value })}
                                fullWidth
                                size="small"
                              />

                              <FormControl fullWidth size="small">
                                <InputLabel>Status</InputLabel>
                                <Select
                                  value={formData.status ?? ""}
                                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                >
                                  <MenuItem value="pendente">Pendente</MenuItem>
                                  <MenuItem value="ativo">Ativo</MenuItem>
                                  <MenuItem value="finalizado">Finalizado</MenuItem>
                                  <MenuItem value="cancelado">Cancelado</MenuItem>
                                </Select>
                              </FormControl>
                            </Stack>
                          </Stack>
                        </CardContent>

                        <Stack
                          direction="row"
                          justifyContent="flex-end"
                          spacing={1}
                          sx={{ px: 2, py: 1, borderTop: "1px solid rgba(0,0,0,0.12)" }}
                        >
                          <IconButton sx={{ color: "#2e7d32" }} onClick={handleSalvar}>
                            <Save />
                          </IconButton>
                          <IconButton sx={{ color: "#6b7280" }} onClick={handleCancelar}>
                            <Cancel />
                          </IconButton>
                        </Stack>
                      </>
                    ) : (
                      <>
                        {/* Modo visualização */}
                        <CardContent sx={{ p: 3 }}>
                          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                              Aluguel #{a.id}
                            </Typography>
                            <Chip
                              icon={getStatusIcon(a.status)}
                              label={a.status.toUpperCase()}
                              sx={{
                                backgroundColor: getStatusColor(a.status),
                                color: "white",
                                fontWeight: 600,
                              }}
                            />
                          </Stack>

                          <Stack spacing={1}>
                            <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <Person fontSize="small" />
                              <strong>Cliente:</strong> {cliente ? cliente.nome : "Cliente não encontrado"}
                            </Typography>
                            <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <DirectionsCar fontSize="small" />
                              <strong>Carro:</strong>{" "}
                              {carro ? `${carro.marca} ${carro.modelo} - ${carro.placa}` : "Carro não encontrado"}
                            </Typography>
                            <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <CalendarToday fontSize="small" />
                              <strong>Período:</strong> {new Date(a.dataInicio).toLocaleDateString()} até{" "}
                              {new Date(a.dataFim).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <AttachMoney fontSize="small" />
                              <strong>Valor:</strong> R$ {Number.parseFloat(a.valorDiario).toFixed(2)}/dia -
                              <strong>
                                {" "}
                                Total: R$ {calcularValorTotal(a.dataInicio, a.dataFim, a.valorDiario).toFixed(2)}
                              </strong>
                            </Typography>
                          </Stack>
                        </CardContent>

                        <Stack
                          direction="row"
                          justifyContent="flex-end"
                          spacing={1}
                          sx={{ px: 2, py: 1, borderTop: "1px solid rgba(0,0,0,0.12)" }}
                        >
                          <IconButton sx={{ color: "#1976d2" }} onClick={() => handleEditar(a)}>
                            <Edit />
                          </IconButton>
                          <IconButton sx={{ color: "#d32f2f" }} onClick={() => handleExcluir(a.id)}>
                            <Delete />
                          </IconButton>
                        </Stack>
                      </>
                    )}
                  </Card>
                </Grid>
              )
            })
          ) : (
            <Typography variant="body1">Nenhum aluguel encontrado.</Typography>
          )}
        </Grid>

        {/* Dialog para novo aluguel */}
        <Dialog open={dialogAberto} onClose={() => setDialogAberto(false)} maxWidth="md" fullWidth>
          <DialogTitle>Novo Aluguel</DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 1 }}>
              <Stack direction="row" spacing={2}>
                <FormControl fullWidth>
                  <InputLabel>Cliente</InputLabel>
                  <Select
                    value={novoAluguel.clienteId}
                    onChange={(e) => setNovoAluguel({ ...novoAluguel, clienteId: e.target.value })}
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
                    onChange={(e) => setNovoAluguel({ ...novoAluguel, carroId: e.target.value })}
                  >
                    {carros.map((c) => (
                      <MenuItem key={c.id} value={c.id}>
                        {c.marca} {c.modelo} - {c.placa}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>

              <Stack direction="row" spacing={2}>
                <TextField
                  label="Data Início"
                  type="date"
                  value={novoAluguel.dataInicio}
                  onChange={(e) => setNovoAluguel({ ...novoAluguel, dataInicio: e.target.value })}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />

                <TextField
                  label="Data Fim"
                  type="date"
                  value={novoAluguel.dataFim}
                  onChange={(e) => setNovoAluguel({ ...novoAluguel, dataFim: e.target.value })}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Stack>

              <TextField
                label="Valor Diário (R$)"
                type="number"
                value={novoAluguel.valorDiario}
                onChange={(e) => setNovoAluguel({ ...novoAluguel, valorDiario: e.target.value })}
                fullWidth
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogAberto(false)}>Cancelar</Button>
            <Button onClick={handleNovoAluguel} variant="contained">
              Criar Aluguel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}
