import type { Cliente } from "../model/ClienteModel"
import type { CreateClienteDTO, UpdateClienteDTO } from "../dto/ClienteDTO"
import { IClienteRepository } from "../interface/IClienteRepository"

export class ClienteService {
    constructor(private clienteRepository: IClienteRepository) { }

    async criarCliente(clienteData: CreateClienteDTO): Promise<Cliente> {
        // Validações de negócio
        await this.validarDadosCliente(clienteData)

        // Verificar se CPF já existe
        const clienteExistenteCpf = await this.clienteRepository.findByCpf(clienteData.cpf)
        if (clienteExistenteCpf) {
            throw new Error("Cliente com este CPF já existe")
        }

        // Verificar se RG já existe
        const clienteExistenteRg = await this.clienteRepository.findByRg(clienteData.rg)
        if (clienteExistenteRg) {
            throw new Error("Cliente com este RG já existe")
        }

        const cliente = await this.clienteRepository.create(clienteData)
        return this.mapToResponseDTO(cliente)
    }

    async listarClientes(): Promise<Cliente[]> {
        const clientes = await this.clienteRepository.findAll()
        return clientes.map((cliente: Cliente) => this.mapToResponseDTO(cliente))
    }

    async buscarClientePorId(id: string): Promise<Cliente | null> {
        const cliente = await this.clienteRepository.findById(id)
        return cliente ? this.mapToResponseDTO(cliente) : null
    }

    async buscarClientePorCpf(cpf: string): Promise<Cliente | null> {
        const cliente = await this.clienteRepository.findByCpf(cpf)
        return cliente ? this.mapToResponseDTO(cliente) : null
    }

    async atualizarCliente(id: string, clienteData: UpdateClienteDTO): Promise<Cliente | null> {
        // Validações de negócio para atualização
        if (clienteData.cpf || clienteData.rg || clienteData.rendimentos || clienteData.empregadores) {
            await this.validarDadosAtualizacao(id, clienteData)
        }

        const cliente = await this.clienteRepository.update(id, clienteData)
        return cliente ? this.mapToResponseDTO(cliente) : null
    }

    async excluirCliente(id: string): Promise<boolean> {
        const clienteExiste = await this.clienteRepository.findById(id)
        if (!clienteExiste) {
            throw new Error("Cliente não encontrado")
        }

        return await this.clienteRepository.delete(id)
    }

    private async validarDadosCliente(clienteData: CreateClienteDTO): Promise<void> {
        // Validar CPF
        if (!this.validarCPF(clienteData.cpf)) {
            throw new Error("CPF inválido")
        }

        // Validar RG
        if (!clienteData.rg || clienteData.rg.trim().length < 5) {
            throw new Error("RG deve ter pelo menos 5 caracteres")
        }

        // Validar nome
        if (!clienteData.nome || clienteData.nome.trim().length < 2) {
            throw new Error("Nome deve ter pelo menos 2 caracteres")
        }

        // Validar rendimentos
        if (!clienteData.rendimentos || clienteData.rendimentos.length !== 3) {
            throw new Error("Rendimentos deve conter exatamente 3 valores")
        }

        // Validar que todos os rendimentos são números positivos
        if (clienteData.rendimentos.some((r) => r < 0)) {
            throw new Error("Rendimentos não podem ser negativos")
        }

        // Validar empregadores
        if (!clienteData.empregadores || clienteData.empregadores.length === 0) {
            throw new Error("Pelo menos um empregador deve ser informado")
        }

        // Validar que o número de empregadores não excede o número de rendimentos
        if (clienteData.empregadores.length > 3) {
            throw new Error("Máximo de 3 empregadores permitidos")
        }
    }

    private async validarDadosAtualizacao(id: string, clienteData: UpdateClienteDTO): Promise<void> {
        // Validar CPF se fornecido
        if (clienteData.cpf) {
            if (!this.validarCPF(clienteData.cpf)) {
                throw new Error("CPF inválido")
            }

            const clienteExistente = await this.clienteRepository.findByCpf(clienteData.cpf)
            if (clienteExistente && clienteExistente.id !== id) {
                throw new Error("CPF já está em uso por outro cliente")
            }
        }

        // Validar RG se fornecido
        if (clienteData.rg) {
            if (clienteData.rg.trim().length < 5) {
                throw new Error("RG deve ter pelo menos 5 caracteres")
            }

            const clienteExistente = await this.clienteRepository.findByRg(clienteData.rg)
            if (clienteExistente && clienteExistente.id !== id) {
                throw new Error("RG já está em uso por outro cliente")
            }
        }

        // Validar rendimentos se fornecido
        if (clienteData.rendimentos) {
            if (clienteData.rendimentos.length !== 3) {
                throw new Error("Rendimentos deve conter exatamente 3 valores")
            }

            if (clienteData.rendimentos.some((r) => r < 0)) {
                throw new Error("Rendimentos não podem ser negativos")
            }
        }

        // Validar empregadores se fornecido
        if (clienteData.empregadores) {
            if (clienteData.empregadores.length === 0) {
                throw new Error("Pelo menos um empregador deve ser informado")
            }

            if (clienteData.empregadores.length > 3) {
                throw new Error("Máximo de 3 empregadores permitidos")
            }
        }
    }

    private validarCPF(cpf: string): boolean {
        // Remove caracteres não numéricos
        cpf = cpf.replace(/[^\d]/g, "")

        // Verifica se tem 11 dígitos
        if (cpf.length !== 11) return false

        // Verifica se todos os dígitos são iguais
        if (/^(\d)\1{10}$/.test(cpf)) return false

        // Validação dos dígitos verificadores
        let soma = 0
        for (let i = 0; i < 9; i++) {
            soma += Number.parseInt(cpf.charAt(i)) * (10 - i)
        }
        let resto = 11 - (soma % 11)
        if (resto === 10 || resto === 11) resto = 0
        if (resto !== Number.parseInt(cpf.charAt(9))) return false

        soma = 0
        for (let i = 0; i < 10; i++) {
            soma += Number.parseInt(cpf.charAt(i)) * (11 - i)
        }
        resto = 11 - (soma % 11)
        if (resto === 10 || resto === 11) resto = 0
        if (resto !== Number.parseInt(cpf.charAt(10))) return false

        return true
    }

    private mapToResponseDTO(cliente: Cliente): Cliente {
        return {
            id: cliente.id,
            nome: cliente.nome,
            rg: cliente.rg,
            cpf: cliente.cpf,
            endereco: cliente.endereco,
            profissao: cliente.profissao,
            rendimentos: cliente.rendimentos,
            empregadores: cliente.empregadores,
            createdAt: cliente.createdAt || new Date(),
            updatedAt: cliente.updatedAt || new Date(),
        }
    }
}