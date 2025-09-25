import type { IPedidoRepository } from "../../application/interface/IPedidoRepository";
import type { PedidoAluguel } from "../../application/model/PedidoAluguelModel";
import type {
  CreatePedidoDTO,
  UpdatePedidoDTO,
} from "../../application/dto/PedidoDTO";
import sql from "../config/database";
import { v4 as uuidv4 } from "uuid";

export class PedidoRepository implements IPedidoRepository {
  async create(pedidoData: CreatePedidoDTO): Promise<PedidoAluguel> {
    const id = uuidv4();
    try {
      const pedido = await sql`
                INSERT INTO pedidos (id, cliente_id, automovel_id, data_inicio, data_fim, valor_estimado, status)
                VALUES (
                    ${id},
                    ${pedidoData.clienteId},
                    ${pedidoData.automovelId},
                    ${pedidoData.dataInicio},
                    ${pedidoData.dataFim},
                    ${pedidoData.valorEstimado ?? null}, 
                    'PENDENTE'
                )
                RETURNING *;
            `;

      return this.mapToPedido(pedido[0]);
    } catch (error) {
      throw new Error(`Erro ao criar pedido: ${error}`);
    }
  }

  async findAll(): Promise<PedidoAluguel[]> {
    const pedidos = await sql`SELECT * FROM pedidos ORDER BY created_at DESC;`;
    return pedidos.map(this.mapToPedido);
  }

  async findById(id: string): Promise<PedidoAluguel | null> {
    const pedido = await sql`SELECT * FROM pedidos WHERE id = ${id};`;
    if (!pedido[0]) return null;
    return this.mapToPedido(pedido[0]);
  }

  async update(
    id: string,
    pedidoData: UpdatePedidoDTO
  ): Promise<PedidoAluguel | null> {
    const pedido = await sql`
        UPDATE pedidos SET
        automovel_id = COALESCE(${
          pedidoData.automovelId ?? null
        }, automovel_id),
        data_inicio = COALESCE(${pedidoData.dataInicio ?? null}, data_inicio),
        data_fim = COALESCE(${pedidoData.dataFim ?? null}, data_fim),
        valor_estimado = COALESCE(${
          pedidoData.valorEstimado ?? null
        }, valor_estimado),
        status = COALESCE(${pedidoData.status ?? null}, status),
        updated_at = now()
    WHERE id = ${id}
    RETURNING *;
        `;
    if (!pedido[0]) return null;
    return this.mapToPedido(pedido[0]);
  }

  async delete(id: string): Promise<boolean> {
    const result = await sql`DELETE FROM pedidos WHERE id = ${id};`;
    return result.count > 0;
  }

  async findByClienteId(clienteId: string): Promise<PedidoAluguel[]> {
    const pedidos =
      await sql`SELECT * FROM pedidos WHERE cliente_id = ${clienteId} ORDER BY created_at DESC;`;
    return pedidos.map(this.mapToPedido);
  }

  private mapToPedido(row: any): PedidoAluguel {
    return {
      id: row.id,
      clienteId: row.cliente_id,
      automovelId: row.automovel_id,
      dataInicio: row.data_inicio,
      dataFim: row.data_fim,
      valorEstimado: row.valor_estimado,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}
