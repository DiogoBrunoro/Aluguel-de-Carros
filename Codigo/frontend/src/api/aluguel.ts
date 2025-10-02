import { CreateAluguel, UpdateAluguel } from "../types/types";
import apiUrl from "./apiUrl";

export async function createAluguel(aluguel: CreateAluguel) {

    const token = sessionStorage.getItem("token")

    const response = await fetch(`${apiUrl}/aluguel`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(aluguel),
    });
    if (!response.ok) {
        throw new Error("Erro ao criar aluguel");
    }

    const data = await response.json();
    return data;
}

export async function listAllRealAlugueis() {

    const token = sessionStorage.getItem("token")

    const response = await fetch(`${apiUrl}/aluguel/pe                                                                                                                                                                             didos`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    console.log("Response",response)

    if (!response.ok) {
        throw new Error("Erro ao listar alugueis");
    }
    const data = await response.json();

    console.log("Data",data)
    return data;
}


export async function listAllAlugueis() {

    const token = sessionStorage.getItem("token")

    const response = await fetch(`${apiUrl}/aluguel`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    console.log("Response",response)

    if (!response.ok) {
        throw new Error("Erro ao listar alugueis");
    }
    const data = await response.json();

    console.log("Data",data)
    return data;
}

export async function updateAluguel(aluguel: UpdateAluguel) {

    const token = sessionStorage.getItem("token")
    const response = await fetch(`${apiUrl}/aluguel/${aluguel.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({status: aluguel.status}),
    });
    if (!response.ok) {
        throw new Error("Erro ao atualizar aluguel");
    }

    const data = await response.json();
    return data;

}

export async function deleteAluguel(id: number) {

 const token = sessionStorage.getItem("token")
    const response = await fetch(`${apiUrl}/aluguel/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });
    if (!response.ok) {
        throw new Error("Erro ao deletar aluguel");
    }

    return true;

}