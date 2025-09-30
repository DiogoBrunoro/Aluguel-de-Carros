"use client"

import { useState } from "react"
import { Card, CardContent} from "../components/ui/Card"
import { Label } from "../components/ui/Label"
import { Input } from "../components/ui/Input"
import { Car, Mail, Lock, ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/Button"

export default function LoginScreen() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()

  }

  return (
    <div className="screen-container login-bg">
      <div className="form-container">
        {/* Logo/Header */}
        <div className="header-section">
          <div className="logo-container blue-gradient">
            <Car className="action-icon" style={{ width: "2rem", height: "2rem", margin: 0 }} />
          </div>
          <h1 className="main-title">Sistema de Aluguel</h1>
          <p className="subtitle">Faça login para acessar o sistema</p>
        </div>

        {/* Login Card */}
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit} className="form-space">
              <div className="field-group">
                <Label htmlFor="email">Email</Label>
                <div className="input-wrapper">
                  <Mail className="input-icon" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="with-icon"
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="with-icon"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="btn-full">
                <span className="flex-center">
                  Entrar
                  <ArrowRight style={{ width: "1rem", height: "1rem" }} />
                </span>
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-300">
                Não tem uma conta?{" "}
                <button onClick={() => navigate("/cadastro")} className="text-link">
                  Cadastre-se
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
