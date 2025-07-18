import db from "../db.js";

async function getTodosLivros() {
  return await db.query("SELECT * FROM livros");
}

async function getLivroPorId(id) {
  return await db.query("SELECT * FROM livros WHERE id = ?", [id]);
}

async function insereLivro(body) {
  const { nome, autor, ano } = body;
  const [result] = await db.query(
    "INSERT INTO livros (nome, autor, ano) VALUES (?, ?, ?)",
    [nome, autor, ano]
  );
  return { id: result.insertId, ...body };
}

async function modificaLivro(modificacoes, id) {
  const campos = [],
    valores = [];
  for (const [chave, valor] of Object.entries(modificacoes)) {
    campos.push(`${chave} = ?`);
    valores.push(valor);
  }
  valores.push(id);

  const sql = `UPDATE livros SET ${campos.join(', ')} WHERE id = ?`;
  await db.query(sql, valores);
  return getTodosLivros();
}

async function removeLivro(id) {
  await db.query(`DELETE FROM livros WHERE id = ?`, [id]);
  return getTodosLivros();
}

export {
  getTodosLivros,
  getLivroPorId,
  insereLivro,
  modificaLivro,
  removeLivro,
};
