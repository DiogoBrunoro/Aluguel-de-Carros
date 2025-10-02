import { Automovel } from "../model/AutomovelModel.js";

export interface CreatePedidoAluguelDTO {
    cliente_id: string;        
    automovel_id: string;      
    data_inicio: Date;
    data_fim: Date;
    valor: number;
}

export interface UpdatePedidoAluguelDTO {
    status?: "pendente" | "aprovado" | "rejeitado" | "cancelado";
}

export interface listarPedidoAluguelDTO {
    id: string;
    cliente_id: string;
    automovel_id: string;
    data_inicio: Date;
    data_fim: Date;
    status: "pendente" | "aprovado" | "rejeitado" | "cancelado";
    valor: number;
    automovel: Automovel; 
}

export interface UpdatePedidoAluguelDTO {
    data_inicio?: Date;
    data_fim?: Date;
    status?: "pendente" | "aprovado" | "rejeitado" | "cancelado";
    valor?: number;
}