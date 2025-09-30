"use client"

import { FormEvent, useState } from "react"
import { Car, Mail, Lock, User, Phone, ArrowRight, BriefcaseBusiness, DollarSign, MapPinHouse, Users } from "lucide-react"
import { CardMembership } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "../components/ui/Card"
import { Label } from "../components/ui/Label"
import { Input } from "../components/ui/Input"
import { Button } from "../components/ui/Button"
import { Cliente } from "../types/types"

interface FormData {
  name: string
  cpf: string
  rg: string
  endereco: string
  profissao: string
  rendimentos: string
  empregadores: string
  password: string
  confirmPassword: string
}

export default function RegisterScreen() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    cpf: "",
    rg: "",
    endereco: "",
    profissao: "",
    rendimentos: "",
    empregadores: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (field: keyof FormData, value: string): void => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem!")
      return
    }

    const clienteData: Omit<Cliente, "id"> = {
      nome: formData.name,
      rg: formData.rg,
      cpf: formData.cpf,
      endereco: formData.endereco,
      profissao: formData.profissao || undefined,
      rendimentos: formData.rendimentos
        .split(",")
        .map((r) => Number.parseFloat(r.trim()))
        .filter((r) => !isNaN(r)),
      empregadores: formData.empregadores
        .split(",")
        .map((e) => e.trim())
        .filter((e) => e.length > 0),
      senha: formData.password,
    }

    try {
      const response = await criarCliente(clienteData)
      if (response.ok) {
        alert("Cliente criado com sucesso!")
        navigate("/login")
      } else {
        const error = await response.json()
        alert(`Erro ao criar cliente: ${error.message}`)
      }
    } catch (error) {
      alert("Erro ao criar cliente. Tente novamente.")
      console.error("Error:", error)
    }
  }

  return (
    <div className="screen-container register-bg">
      <div className="form-container">
        {/* Logo/Header */}
        <div className="header-section">
          <div className="logo-container purple-gradient">
            <Car className="action-icon" style={{ width: "2rem", height: "2rem", margin: 0 }} />
          </div>
          <h1 className="main-title">Criar Conta</h1>
          <p className="subtitle">Cadastre-se para acessar o sistema</p>
        </div>

        {/* Register Card */}
        <Card className="bg-white/30 backdrop-blur-3xl shadow-lg">
          <CardContent>
            <form onSubmit={handleSubmit} className="form-space compact">
              <div className="field-group">
                <Label htmlFor="name">Nome Completo</Label>
                <div className="input-wrapper">
                  <User className="input-icon" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="with-icon purple-focus"
                    required
                  />
                </div>
              </div>

              <div className="field-group">
                <Label htmlFor="cpf">CPF</Label>
                <div className="input-wrapper">
                  <CardMembership className="input-icon" />
                  <Input
                    id="cpf"
                    type="text"
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={(e) => handleChange("cpf", e.target.value)}
                    className="with-icon purple-focus"
                    required
                  />
                </div>
              </div>

              <div className="field-group">
                <Label htmlFor="rg">RG</Label>
                <div className="input-wrapper">
                  <Mail className="input-icon" />
                  <Input
                    id="rg"
                    type="text"
                    placeholder="MG-00.000.000"
                    value={formData.rg}
                    onChange={(e) => handleChange("rg", e.target.value)}
                    className="with-icon purple-focus"
                    required
                  />
                </div>
              </div>

              <div className="field-group">
                <Label htmlFor="password">Senha</Label>
                <div className="input-wrapper">
                  <Lock className="input-icon" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className="with-icon purple-focus"
                    required
                  />
                </div>
              </div>

              <div className="field-group">
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <div className="input-wrapper">
                  <Lock className="input-icon" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    className="with-icon purple-focus"
                    required
                  />
                </div>
              </div>

              <div className="field-group">
                <Label htmlFor="endereco">Endereço</Label>
                <div className="input-wrapper">
                  <MapPinHouse className="input-icon" />
                  <Input
                    id="endereco"
                    type="text"
                    placeholder="Rua, nº, bairro, cidade"
                    value={formData.endereco}
                    onChange={(e) => handleChange("endereco", e.target.value)}
                    className="with-icon purple-focus"
                    required
                  />
                </div>
              </div>

              <div className="field-group">
                <Label htmlFor="profissao">Profissão</Label>
                <div className="input-wrapper">
                  <BriefcaseBusiness className="input-icon" />
                  <Input
                    id="profissao"
                    type="text"
                    placeholder="Sua profissão"
                    value={formData.profissao}
                    onChange={(e) => handleChange("profissao", e.target.value)}
                    className="with-icon purple-focus"
                  />
                </div>
              </div>

              <div className="field-group">
                <Label htmlFor="rendimentos">Rendimentos</Label>
                <div className="input-wrapper">
                  <DollarSign className="input-icon" />
                  <Input
                    id="rendimentos"
                    type="text"
                    placeholder="Ex: 2500, 3200, 1500"
                    value={formData.rendimentos}
                    onChange={(e) => handleChange("rendimentos", e.target.value)}
                    className="with-icon purple-focus"
                    required
                  />
                </div>
              </div>

              <div className="field-group">
                <Label htmlFor="empregadores">Empregadores</Label>
                <div className="input-wrapper">
                  <Users className="input-icon" />
                  <Input
                    id="empregadores"
                    type="text"
                    placeholder="Ex: Empresa A, Empresa B"
                    value={formData.empregadores}
                    onChange={(e) => handleChange("empregadores", e.target.value)}
                    className="with-icon purple-focus"
                    required
                  />
                </div>
              </div>

              <Button type="submit" variant="secondary" className="btn-full">
                <span className="flex-center">
                  Criar Conta
                  <ArrowRight style={{ width: "1rem", height: "1rem" }} />
                </span>
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-300">
                Já tem uma conta?{" "}
                <button onClick={() => navigate("/login")} className="text-link purple">
                  Faça login
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="footer-section">
          <p className="footer-text">© 2025 Sistema de Aluguel de Carros</p>
        </div>
      </div>
    </div>
  )
}
