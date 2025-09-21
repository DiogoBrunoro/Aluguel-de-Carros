import { Handler } from "express";
import sql from "../config/database";

// Criar cliente + entidades empregadoras
export const criarCliente: Handler = async (req, res) => {
  const { rg, cpf, nome, endereco, profissao, empregadores } = req.body;
  try {
    // Inserir cliente
    const cliente = await sql`
      INSERT INTO clientes (rg, cpf, nome, endereco, profissao)
      VALUES (${rg}, ${cpf}, ${nome}, ${endereco}, ${profissao})
      RETURNING *;
    `;
    const clienteId = cliente[0].id;

    // Inserir empregadores
    if (empregadores && empregadores.length > 0) {
      for (const e of empregadores) {
        await sql`
          INSERT INTO entidades_empregadoras (cliente_id, nome, rendimento)
          VALUES (${clienteId}, ${e.nome}, ${e.rendimento});
        `;
      }
    }

    res.status(201).json({ ...cliente[0], empregadores });
  } catch (err: any) {
    console.error(err); // Mostra o erro completo no terminal   
    res.status(400).json({ error: err.message || err.toString() });
  }
};

// Listar clientes com empregadores
export const listarClientes: Handler = async (req, res) => {
  try {
    const clientes = await sql`SELECT * FROM clientes;`;

    const clientesComEmpregadores = await Promise.all(
      clientes.map(async (c) => {
        const empregadores = await sql`
          SELECT * FROM entidades_empregadoras
          WHERE cliente_id = ${c.id};
        `;
        return { ...c, empregadores };
      })
    );

    res.json(clientesComEmpregadores);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Buscar cliente por ID com empregadores
export const buscarCliente: Handler = async (req, res) => {
  try {
    const cliente = await sql`
      SELECT * FROM clientes WHERE id = ${req.params.id};
    `;
    if (!cliente[0]) return res.status(404).json({ error: "Cliente não encontrado" });

    const empregadores = await sql`
      SELECT * FROM entidades_empregadoras WHERE cliente_id = ${req.params.id};
    `;

    res.json({ ...cliente[0], empregadores });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Atualizar cliente + empregadores
export const atualizarCliente: Handler = async (req, res) => {
  const { rg, cpf, nome, endereco, profissao, empregadores } = req.body;
  try {
    // Atualizar cliente
    const cliente = await sql`
      UPDATE clientes SET
        rg = ${rg},
        cpf = ${cpf},
        nome = ${nome},
        endereco = ${endereco},
        profissao = ${profissao},
        updated_at = now()
      WHERE id = ${req.params.id}
      RETURNING *;
    `;
    if (!cliente[0]) return res.status(404).json({ error: "Cliente não encontrado" });

    // Deletar empregadores antigos
    await sql`DELETE FROM entidades_empregadoras WHERE cliente_id = ${req.params.id};`;

    // Inserir novos empregadores
    if (empregadores && empregadores.length > 0) {
      for (const e of empregadores) {
        await sql`
          INSERT INTO entidades_empregadoras (cliente_id, nome, rendimento)
          VALUES (${req.params.id}, ${e.nome}, ${e.rendimento});
        `;
      }
    }

    res.json({ ...cliente[0], empregadores });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Excluir cliente (cascade apaga empregadores)
export const excluirCliente: Handler = async (req, res) => {
  try {
    await sql`DELETE FROM clientes WHERE id = ${req.params.id};`;
    res.json({ message: "Cliente removido com sucesso" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
