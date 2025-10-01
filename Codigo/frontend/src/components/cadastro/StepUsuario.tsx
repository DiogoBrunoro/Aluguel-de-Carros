// "use client"

// import type { JSX } from "react"
// import { useState, type ChangeEvent, type FormEvent } from "react"
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/Card"
// import { Label } from "../ui/Label"
// import { Input } from "../ui/Input"
// import { Button } from "../ui/Button"


// export interface UsuarioFormData {
//   nome: string
//   email: string
//   cpf: string
//   rg: string
//   senha: string
//   confirmarSenha: string
// }

// interface StepUsuarioProps {
//   onNext: (data: UsuarioFormData, userId: number) => void
// }

// export default function StepUsuario({ onNext }: StepUsuarioProps): JSX.Element {
//   const [formData, setFormData] = useState<UsuarioFormData>({
//     nome: "",
//     email: "",
//     cpf: "",
//     rg: "",
//     senha: "",
//     confirmarSenha: "",
//   })

//   const [loading, setLoading] = useState<boolean>(false)
//   const [error, setError] = useState<string>("")

//   const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
//     e.preventDefault()
//     setError("")

//     if (formData.senha !== formData.confirmarSenha) {
//       setError("As senhas não coincidem")
//       return
//     }

//     setLoading(true)

//     console.log("FormData: ", formData)

//     try {
//       const response = await fetch("http://localhost:8080/api/clientes", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           nome: formData.nome,
//           email: formData.email,
//           cpf: formData.cpf,
//           rg: formData.rg,
//           senha: formData.senha,
//         }),
//       })

//       if (!response.ok) {
//         throw new Error("Erro ao criar usuário")
//       }

//       const usuario = await response.json()
//       onNext(formData, usuario.id)
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Erro ao criar usuário")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <Card className="">
//       <CardHeader className="!p-8 !pb-0">
//         <CardTitle>Dados do Usuário</CardTitle>
//         <CardDescription>Preencha os dados básicos para criar sua conta</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="nome">Nome Completo</Label>
//             <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="email">Email</Label>
//             <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="cpf">CPF</Label>
//               <Input id="cpf" name="cpf" value={formData.cpf} onChange={handleChange} required />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="rg">RG</Label>
//               <Input id="rg" name="rg" value={formData.rg} onChange={handleChange} required />
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="senha">Senha</Label>
//               <Input id="senha" name="senha" type="password" value={formData.senha} onChange={handleChange} required />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
//               <Input
//                 id="confirmarSenha"
//                 name="confirmarSenha"
//                 type="password"
//                 value={formData.confirmarSenha}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>

//           {error && <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">{error}</div>}

//           <Button type="submit" className="w-full !mt-5" disabled={loading}>
//             {loading ? "Criando usuário..." : "Próximo"}
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   )
// }
