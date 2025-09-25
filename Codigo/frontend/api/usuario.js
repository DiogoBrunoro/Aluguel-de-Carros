// services/clienteApiService.js

import apiUrl from "./apiUrl";

const API_BASE_URL = apiUrl; 

/**
 * Função utilitária para lidar com a resposta da API.
 * @param {Response} response - A resposta HTTP da requisição fetch.
 * @returns {Promise<any>} - O corpo da resposta JSON ou lança um erro.
 */
async function handleApiResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    // Se a resposta não for bem-sucedida (status 4xx ou 5xx)
    throw new Error(data.error || 'Erro desconhecido da API');
  }
  return data;
}

/**
 * Cria um novo cliente.
 * @param {object} clienteData - Dados do cliente a ser criado (conforme CreateClienteDTO).
 * @returns {Promise<object>} - O cliente criado.
 */
export async function criarCliente(clienteData) {
  try {
    const response = await fetch(`${API_BASE_URL}/clientes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clienteData),
    });
    return await handleApiResponse(response);
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    throw error;
  }
}

/**
 * Lista todos os clientes.
 * @returns {Promise<Array<object>>} - Uma lista de clientes.
 */
export async function listarClientes() {
  try {
    const response = await fetch(`${API_BASE_URL}/clientes`, {
      method: 'GET',
      headers: {
      },
    });
    const data = await handleApiResponse(response);
    return data.data; // Retorna apenas o array de clientes
  } catch (error) {
    console.error('Erro ao listar clientes:', error);
    throw error;
  }
}

/**
 * Busca um cliente pelo ID.
 * @param {string} id - O ID do cliente.
 * @returns {Promise<object>} - O cliente encontrado.
 */
export async function buscarClientePorId(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/clientes/${id}`, {
      method: 'GET',
      headers: {
      },
    });
    const data = await handleApiResponse(response);
    return data.data; // Retorna o objeto cliente
  } catch (error) {
    console.error(`Erro ao buscar cliente com ID ${id}:`, error);
    throw error;
  }
}

/**
 * Busca um cliente pelo CPF.
 * @param {string} cpf - O CPF do cliente.
 * @returns {Promise<object>} - O cliente encontrado.
 */
export async function buscarClientePorCpf(cpf) {
  try {
    const response = await fetch(`${API_BASE_URL}/clientes/cpf/${cpf}`, {
      method: 'GET',
      headers: {
      },
    });
    const data = await handleApiResponse(response);
    return data.data; // Retorna o objeto cliente
  } catch (error) {
    console.error(`Erro ao buscar cliente com CPF ${cpf}:`, error);
    throw error;
  }
}

/**
 * Atualiza um cliente existente.
 * @param {string} id - O ID do cliente a ser atualizado.
 * @param {object} clienteData - Os dados atualizados do cliente (conforme UpdateClienteDTO).
 * @returns {Promise<object>} - O cliente atualizado.
 */
export async function atualizarCliente(id, clienteData) {
  try {
    const response = await fetch(`${API_BASE_URL}/clientes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clienteData),
    });
    return await handleApiResponse(response);
  } catch (error) {
    console.error(`Erro ao atualizar cliente com ID ${id}:`, error);
    throw error;
  }
}

/**
 * Exclui um cliente pelo ID.
 * @param {string} id - O ID do cliente a ser excluído.
 * @returns {Promise<object>} - Um objeto de sucesso indicando a exclusão.
 */
export async function excluirCliente(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/clientes/${id}`, {
      method: 'DELETE',
      headers: {
      },
    });
    return await handleApiResponse(response);
  } catch (error) {
    console.error(`Erro ao excluir cliente com ID ${id}:`, error);
    throw error;
  }
}