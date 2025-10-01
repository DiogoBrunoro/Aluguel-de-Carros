"use client"

import type { JSX } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Car, CheckCircle2 } from "lucide-react"
// import StepUsuario, { UsuarioFormData } from "../components/cadastro/StepUsuario"
import StepRole from "../components/cadastro/StepRoleForm"
import StepCliente from "../components/cadastro/StepClienteForm"
import StepAgente from "../components/cadastro/StepAgentForm"
import { Step, UserRole } from "../types/types"

export default function RegisterScreen(): JSX.Element {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  // const [usuarioData, setUsuarioData] = useState<UsuarioFormData | null>(null)

  // const handleUsuarioNext = (data: UsuarioFormData, userId: number): void => {
  //   setUsuarioData(data)
  //   setUsuarioId(userId)
  //   setCurrentStep(2)
  // }

  const handleRoleSelect = (role: UserRole): void => {
    setSelectedRole(role)
    setCurrentStep(2)
  }
  const handleRoleBack = (): void => {
    setCurrentStep(1)
    setSelectedRole(null)
  }

  const handlePerfilBack = (): void => {
    setCurrentStep(1)
    setSelectedRole(null)
  }

  const handleSuccess = (): void => {
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center !mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
            <Car className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Criar Conta</h1>
          <p className="text-purple-200">Cadastre-se para acessar o sistema</p>
        </div>

        {/* Progress Indicator */}
       <div className="flex items-center justify-center !mb-8">
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                currentStep >= 1 ? "bg-white text-purple-600" : "bg-purple-400 text-white"
              }`}
            >
              {currentStep > 1 ? <CheckCircle2 className="w-6 h-6" /> : "1"}
            </div>
            <div className={`w-16 h-1 ${currentStep >= 2 ? "bg-white" : "bg-purple-400"}`} />
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                currentStep >= 2 ? "bg-white text-purple-600" : "bg-purple-400 text-white"
              }`}
            >
              2
            </div>
          </div>
        </div>

        {/* Step Components */}
        {/* {currentStep === 0 && <StepUsuario onNext={handleUsuarioNext} />} */}

        {currentStep === 1 && <StepRole onSelect={handleRoleSelect} onBack={handleRoleBack} />}

        {currentStep === 2 && selectedRole === "CLIENTE" && (
          <StepCliente onSuccess={handleSuccess} onBack={handlePerfilBack} />
        )}

        {currentStep === 2 && selectedRole === "AGENTE" && (
          <StepAgente onSuccess={handleSuccess} onBack={handlePerfilBack} />
        )}

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-white">
            Já tem uma conta?{" "}
            <button onClick={() => navigate("/")} className="font-semibold underline hover:text-purple-200">
              Faça login
            </button>
          </p>
        </div>

        <div className="text-center mt-4">
          <p className="text-purple-200 text-sm">© 2025 Sistema de Aluguel de Carros</p>
        </div>
      </div>
    </div>
  )
}
