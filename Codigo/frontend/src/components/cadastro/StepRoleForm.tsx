"use client"

import type { JSX } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/Card"
import { Building2, User } from "lucide-react"
import { Button } from "../ui/Button"
import { UserRole } from "../../types/types"

interface StepRoleProps {
  onSelect: (role: UserRole) => void
  onBack: () => void
}

export default function StepRole({ onSelect, onBack }: StepRoleProps): JSX.Element {
  return (
    <Card>
      <CardHeader className="!p-8 !pb-0 gap-2">
        <CardTitle>Tipo de Cadastro</CardTitle>
        <CardDescription>Selecione o tipo de perfil que deseja criar</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card
            className="relative cursor-pointer border-2 transition-colors hover:border-primary"
            onClick={() => onSelect("CLIENTE")}
          >
            <CardHeader className="flex flex-col items-center justify-center text-center h-30 relative">
              {/* Ícone fixo no topo */}
              <div className="absolute top-0 left-0 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <User className="h-6 w-6 text-primary" />
              </div>

              {/* Texto centralizado no meio */}
              <div className="flex flex-col items-center justify-center">
                <CardTitle className="text-lg">Cliente</CardTitle>
                <CardDescription>Pessoa física que deseja alugar veículos</CardDescription>
              </div>
            </CardHeader>
          </Card>

          <Card
            className="relative cursor-pointer border-2 transition-colors hover:border-primary"
            onClick={() => onSelect("AGENTE")}
          >
            <CardHeader className="flex flex-col items-center justify-center text-center h-30 relative">
              {/* Ícone fixo no topo */}
              <div className="absolute top-0 left-0 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Building2 className="h-6 w-6 text-primary" />
              </div>

              {/* Texto centralizado no meio */}
              <div className="flex flex-col items-center justify-center">
                <CardTitle className="text-lg">Agente</CardTitle>
                <CardDescription>Empresa ou banco que oferece crédito</CardDescription>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* <Button variant="outline" onClick={onBack} className="w-full bg-transparent">
          Voltar
        </Button> */}
      </CardContent>
    </Card>
  )
}
