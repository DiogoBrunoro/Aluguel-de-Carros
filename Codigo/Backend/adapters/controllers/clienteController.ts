import type { Handler } from "express"
import { ClienteService } from "../../application/service/ClienteService.js"
import { CreateClienteDTO, UpdateClienteDTO } from "../../application/dto/ClienteDTO.js"
import { ClienteRepository } from "../repositories/ClienteRepository.js"

// Dependency Injection
const clienteRepository = new ClienteRepository()
const clienteService = new ClienteService(clienteRepository)

export const criarCliente: Handler = async (req, res) => {
  try {
    const clienteData: CreateClienteDTO = req.body
    const cliente = await clienteService.criarCliente(clienteData)

    res.status(201).json({
      success: true,
      data: cliente,
      message: "Cliente criado com sucesso",
    })
  } catch (error: any) {
    console.error("Erro ao criar cliente:", error)
    res.status(400).json({
      success: false,
      error: error.message || "Erro interno do servidor",
    })
  }
}

export const listarClientes: Handler = async (req, res) => {
  try {
    const clientes = await clienteService.listarClientes()

    res.json({
      success: true,
      data: clientes,
      total: clientes.length,
    })
  } catch (error: any) {
    console.error("Erro ao listar clientes:", error)
    res.status(500).json({
      success: false,
      error: error.message || "Erro interno do servidor",
    })
  }
}

export const buscarCliente: Handler = async (req, res) => {
  try {
    const { id } = req.params
    const cliente = await clienteService.buscarClientePorId(id)

    if (!cliente) {
      return res.status(404).json({
        success: false,
        error: "Cliente não encontrado",
      })
    }

    res.json({
      success: true,
      data: cliente,
    })
  } catch (error: any) {
    console.error("Erro ao buscar cliente:", error)
    res.status(500).json({
      success: false,
      error: error.message || "Erro interno do servidor",
    })
  }
}

export const buscarClientePorCpf: Handler = async (req, res) => {
  try {
    const { cpf } = req.params
    const cliente = await clienteService.buscarClientePorCpf(cpf)

    if (!cliente) {
      return res.status(404).json({
        success: false,
        error: "Cliente não encontrado",
      })
    }

    res.json({
      success: true,
      data: cliente,
    })
  } catch (error: any) {
    console.error("Erro ao buscar cliente por CPF:", error)
    res.status(500).json({
      success: false,
      error: error.message || "Erro interno do servidor",
    })
  }
}

export const atualizarCliente: Handler = async (req, res) => {
  try {
    const { id } = req.params
    const clienteData: UpdateClienteDTO = req.body

    const cliente = await clienteService.atualizarCliente(id, clienteData)

    if (!cliente) {
      return res.status(404).json({
        success: false,
        error: "Cliente não encontrado",
      })
    }

    res.json({
      success: true,
      data: cliente,
      message: "Cliente atualizado com sucesso",
    })
  } catch (error: any) {
    console.error("Erro ao atualizar cliente:", error)
    res.status(400).json({
      success: false,
      error: error.message || "Erro interno do servidor",
    })
  }
}

export const excluirCliente: Handler = async (req, res) => {
  try {
    const { id } = req.params
    const sucesso = await clienteService.excluirCliente(id)

    if (!sucesso) {
      return res.status(404).json({
        success: false,
        error: "Cliente não encontrado",
      })
    }

    res.json({
      success: true,
      message: "Cliente removido com sucesso",
    })
  } catch (error: any) {
    console.error("Erro ao excluir cliente:", error)
    res.status(500).json({
      success: false,
      error: error.message || "Erro interno do servidor",
    })
  }
}
