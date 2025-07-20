import db from "../db.js";

async function getTodosAutores() {
  return await db.query("SELECT * FROM autores");
}

async function getAutorPorId(id) {
  return await db.query("SELECT * FROM autores WHERE id = ?", [id]);
}

async function getAutorByNome(nome) {
  console.log(nome);
  return await db.query("SELECT * FROM autores WHERE LOWER(nome) LIKE LOWER(?)", [`%${nome}%`]);
}

async function insereAutor(body) {
  const { nome, nacionalidade } = body;
  const [result] = await db.query(
    "INSERT INTO autores (nome, nacionalidade) VALUES (?, ?)",
    [nome, nacionalidade]
  );
  return { id: result.insertId, ...body };
}

async function modificaAutor(modificacoes, id) {
  const campos = [],
    valores = [];
  for (const [chave, valor] of Object.entries(modificacoes)) {
    campos.push(`${chave} = ?`);
    valores.push(valor);
  }
  valores.push(id);

  const sql = `UPDATE autores SET ${campos.join(', ')} WHERE id = ?`;
  await db.query(sql, valores);
  return await getTodosAutores();
}

async function removeAutor(id) {
  await db.query(`DELETE FROM autores WHERE id = ?`, [id]);
  return await getTodosAutores();
}

export {
  getTodosAutores,
  getAutorPorId,
  getAutorByNome,
  insereAutor,
  modificaAutor,
  removeAutor,
};
