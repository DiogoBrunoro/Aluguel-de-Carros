import { CreateAluguel, UpdateAluguel } from "../types/types";
import apiUrl from "./apiUrl";

export async function createAluguel(aluguel: CreateAluguel) {

    const token = localStorage.getItem("token")

    const response = await fetch(`${apiUrl}/aluguel`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(aluguel),
    });
    console.log("Response: ", response)
    if (!response.ok) {
        throw new Error("Erro ao criar aluguel");
    }

    const data = await response.json();
    console.log(data)
    return data;
}

export async function listAllAlugueis() {

    const token = localStorage.getItem("token")

    const response = await fetch(`${apiUrl}/aluguel`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });
    console.log("Response: ", response)

    if (!response.ok) {
        throw new Error("Erro ao listar alugueis");
    }
    const data = await response.json();
    console.log(data)
    return data;
}

export async function updateAluguel(aluguel: UpdateAluguel) {

    const token = localStorage.getItem("token")
    const response = await fetch(`${apiUrl}/aluguel/${aluguel.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({status: aluguel.status}),
    });
    console.log("Response: ", response)
    if (!response.ok) {
        throw new Error("Erro ao atualizar aluguel");
    }

    const data = await response.json();
    console.log(data)
    return data;

}