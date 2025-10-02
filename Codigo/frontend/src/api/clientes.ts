// services/clienteApiService.js

import { Cliente } from "../types/types";
import apiUrl from "./apiUrl";

const API_BASE_URL = apiUrl; 

async function handleApiResponse(response: Response) {
  const data = await response.json();
  if (!response.ok) {
    // Se a resposta não for bem-sucedida (status 4xx ou 5xx)
    throw new Error(data.error || 'Erro desconhecido da API');
  }
  return data;
}

export async function criarCliente(clienteData: Cliente) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/clientes`, {
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

export async function listarClientes() {

  const token = sessionStorage.getItem('token');

  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    const data = await handleApiResponse(response);
    return data; 
  } catch (error) {
    console.error('Erro ao listar clientes:', error);
    throw error;
  }
}

export async function buscarClientePorId(id: string) {
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

export async function buscarClientePorCpf(cpf: string) {
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

export async function atualizarCliente(id: string, clienteData: Cliente) {
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

export async function excluirCliente(id: string) {
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