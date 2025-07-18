import db from "../db.js";

async function getTodosFavoritos() {
  return await db.query("SELECT * FROM favoritos");
}

async function getFavoritoPorId(id) {
  return await db.query("SELECT * FROM favoritos WHERE id = ?", [id]);
}

async function insereFavorito(body) {
  const { nome, autor, ano } = body;
  const [result] = await db.query(
    "INSERT INTO favoritos (nome, autor, ano) VALUES (?, ?, ?)",
    [nome, autor, ano]
  );
  return { id: result.insertId, ...body };
}

async function modificaFavorito(modificacoes, id) {
  const campos = [],
    valores = [];
  for (const [chave, valor] of Object.entries(modificacoes)) {
    campos.push(`${chave} = ?`);
    valores.push(valor);
  }
  valores.push(id);

  const sql = `UPDATE favoritos SET ${campos.join(', ')} WHERE id = ?`;
  await db.query(sql, valores);
  return getTodosFavoritos();
}

async function removerFavorito(id) {
  await db.query("DELETE FROM favoritos WHERE id = ?", [id]);
  return getTodosFavoritos();
}

export {
  getTodosFavoritos,
  getFavoritoPorId,
  insereFavorito,
  modificaFavorito,
  removerFavorito,
};