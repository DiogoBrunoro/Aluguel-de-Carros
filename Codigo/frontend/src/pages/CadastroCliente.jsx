"use client"

import { useState } from "react"
import { Card, CardContent } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Label } from "../components/ui/Label"
import { Car, Mail, Lock, User, Phone, ArrowRight } from "lucide-react"
import { CardMembership } from "@mui/icons-material"
// import { criarCliente } from "../../api/usuario"

export default function RegisterScreen({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    rg: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem!")
      return
    }
    // criarCliente(formData)
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
        <Card>
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
                <button onClick={onSwitchToLogin} className="text-link purple">
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
