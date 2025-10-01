import { Automovel } from "../model/AutomovelModel.js";

export interface CreatePedidoAluguelDTO {
    clienteId: string;        
    automovelId: string;      
    dataInicio: Date;
    dataFim: Date;
    valor: number;
}

export interface UpdatePedidoAluguelDTO {
    status?: "pendente" | "aprovado" | "rejeitado" | "cancelado";
}

export interface listarPedidoAluguelDTO {
    id: string;
    clienteId: string;
    automovelId: string;
    dataInicio: Date;
    dataFim: Date;
    status: "pendente" | "aprovado" | "rejeitado" | "cancelado";
    valor: number;
    automovel: Automovel; 
}

export interface UpdatePedidoAluguelDTO {
    dataInicio?: Date;
    dataFim?: Date;
    status?: "pendente" | "aprovado" | "rejeitado" | "cancelado";
    valor?: number;
}