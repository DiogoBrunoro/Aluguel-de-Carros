"use client"

import type { JSX } from "react"
import { useState, type ChangeEvent, type FormEvent } from "react"
import { Label } from "../ui/Label"
import { Input } from "../ui/Input"
import { TipoAgente } from "../../types/types"
import { Button } from "../ui/Button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/Card"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../ui/Select"

export interface AgenteFormData {
    cnpj: string
    razaoSocial: string
    tipoAgente: TipoAgente
    enderecoComercial: string
    telefone: string
}

interface StepAgenteProps {
    onSuccess: () => void
    onBack: () => void
}

export default function StepAgente({  onSuccess, onBack }: StepAgenteProps): JSX.Element {
    const [formData, setFormData] = useState<AgenteFormData>({
        cnpj: "",
        razaoSocial: "",
        tipoAgente: "banco",
        enderecoComercial: "",
        telefone: "",
    })

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (value: TipoAgente): void => {
        setFormData((prev) => ({ ...prev, tipoAgente: value }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            const response = await fetch("http://localhost:8080/api/agentes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                }),
            })

            if (!response.ok) {
                throw new Error("Erro ao criar perfil de agente")
            }

            onSuccess()
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao criar perfil de agente")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card>
            <CardHeader className="!p-8 !pb-0 gap-2">
                <CardTitle>Dados do Agente</CardTitle>
                <CardDescription>Complete seu perfil de agente (empresa ou banco)</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="cnpj">CNPJ</Label>
                        <Input
                            id="cnpj"
                            name="cnpj"
                            value={formData.cnpj}
                            onChange={handleChange}
                            placeholder="00.000.000/0000-00"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="razaoSocial">Razão Social</Label>
                        <Input id="razaoSocial" name="razaoSocial" value={formData.razaoSocial} onChange={handleChange} required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tipoAgente">Tipo de Agente</Label>
                        <Select value={formData.tipoAgente} onValueChange={handleSelectChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="banco">Banco</SelectItem>
                                <SelectItem value="empresa">Empresa</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="enderecoComercial">Endereço Comercial</Label>
                        <Input
                            id="enderecoComercial"
                            name="enderecoComercial"
                            value={formData.enderecoComercial}
                            onChange={handleChange}
                            placeholder="Rua, número, bairro, cidade"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="telefone">Telefone</Label>
                        <Input
                            id="telefone"
                            name="telefone"
                            type="tel"
                            value={formData.telefone}
                            onChange={handleChange}
                            placeholder="(00) 00000-0000"
                            required
                        />
                    </div>

                    {error && <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">{error}</div>}

                    <div className="flex gap-2 mt-8">
                        <Button type="button" variant="outline" onClick={onBack} className="flex-1  bg-transparent">
                            Voltar
                        </Button>
                        <Button type="submit" className="flex-1" disabled={loading}>
                            {loading ? "Finalizando..." : "Finalizar Cadastro"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
