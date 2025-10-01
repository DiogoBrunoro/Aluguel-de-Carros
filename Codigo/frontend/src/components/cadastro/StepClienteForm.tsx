"use client"

import type { JSX } from "react"
import { useState, type ChangeEvent, type FormEvent } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/Card"
import { Label } from "../ui/Label"
import { Input } from "../ui/Input"
import { Button } from "../ui/Button"

export interface ClienteFormData {
    nome: string
    email: string
    senha: string
    endereco: string
    profissao: string
    rendimentos: string
    empregadores: string
    confirmarSenha: string
}

interface StepClienteProps {
    onSuccess: () => void
    onBack: () => void
}

export default function StepCliente({ onSuccess, onBack }: StepClienteProps): JSX.Element {
    const [formData, setFormData] = useState<ClienteFormData>({
        nome: "",
        email: "",
        senha: "",
        endereco: "",
        profissao: "",
        rendimentos: "",
        empregadores: "",
        confirmarSenha: "",
    })

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        setError("")
        setLoading(true)

        if (formData.senha !== formData.confirmarSenha) {
            setError("As senhas não coincidem")
            setLoading(false)
            return
        }

        try {

            const empregadoresArray = formData.empregadores
                .split(",")
                .map((emp) => ({ nome: emp.trim() }))
                .filter((emp) => emp.nome.length > 0)

            const payload = {
                nome: formData.nome,
                email: formData.email,
                senha: formData.senha,
                role: "CLIENTE",
                profissao: formData.profissao,
                endereco: formData.endereco,
                rendimentos: formData.rendimentos,
                empregadores: empregadoresArray,
            }

            const response = await fetch("http://localhost:3000/api/users/clientes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })

            if (!response.ok) {
                throw new Error("Erro ao criar perfil de cliente")
            }

            onSuccess()
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao criar perfil de cliente")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card>
            <CardHeader className="!p-8 !pb-0 gap-2">
                <CardTitle>Dados do Cliente</CardTitle>
                <CardDescription>Complete seu perfil de cliente</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Nome */}
                    <div className="space-y-2">
                        <Label htmlFor="nome">Nome</Label>
                        <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                    </div>

                    {/* Senha */}
                    <div className="space-y-2">
                        <Label htmlFor="senha">Senha</Label>
                        <Input id="senha" name="senha" type="password" value={formData.senha} onChange={handleChange} required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
                        <Input
                            id="confirmarSenha"
                            name="confirmarSenha"
                            type="password"
                            value={formData.confirmarSenha}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Endereço */}
                    <div className="space-y-2">
                        <Label htmlFor="endereco">Endereço</Label>
                        <Input
                            id="endereco"
                            name="endereco"
                            value={formData.endereco}
                            onChange={handleChange}
                            placeholder="Rua, número, bairro, cidade"
                            required
                        />
                    </div>

                    {/* Profissão */}
                    <div className="space-y-2">
                        <Label htmlFor="profissao">Profissão</Label>
                        <Input id="profissao" name="profissao" value={formData.profissao} onChange={handleChange} required />
                    </div>

                    {/* Rendimentos */}
                    <div className="space-y-2">
                        <Label htmlFor="rendimentos">Rendimentos Mensais</Label>
                        <Input
                            id="rendimentos"
                            name="rendimentos"
                            type="text"
                            step="0.01"
                            value={formData.rendimentos}
                            onChange={handleChange}
                            placeholder="0.00"
                            required
                        />
                    </div>

                    {/* Empregadores */}
                    <div className="space-y-2">
                        <Label htmlFor="empregadores">Empregadores (separados por vírgula)</Label>
                        <Input
                            id="empregadores"
                            name="empregadores"
                            value={formData.empregadores}
                            onChange={handleChange}
                            placeholder="Empresa 1, Empresa 2"
                            required
                        />
                    </div>

                    {error && <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">{error}</div>}

                    <div className="flex gap-2 mt-8">
                        <Button type="button" variant="outline" onClick={onBack} className="flex-1 bg-transparent">
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
