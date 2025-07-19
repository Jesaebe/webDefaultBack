import fs from "fs";
const pathFavorito = "favoritos.json";

function getTodosFavoritos() {
  return JSON.parse(fs.readFileSync(pathFavorito));
}

function getFavoritoPorId(id) {
  const favoritos = getTodosFavoritos();
  return favoritos.filter((favorito) => favorito.id == id)[0];
}

function insereFavorito(body) {
  const dadosAtuais = getTodosFavoritos();
  fs.writeFileSync(pathFavorito, JSON.stringify([...dadosAtuais, body]));
  return getTodosFavoritos();
}

function modificaFavorito(modificacoes, id) {
  let dadosAtuais = getTodosFavoritos();
  const index = dadosAtuais.findIndex((favorito) => favorito.id == id);
  dadosAtuais[index] = { ...dadosAtuais[index], ...modificacoes };
  fs.writeFileSync(pathFavorito, JSON.stringify(dadosAtuais));
  return getTodosFavoritos();
}

function removerFavorito(id) {
  let dadosAtuais = getTodosFavoritos();
  dadosAtuais = dadosAtuais.filter((favorito) => favorito.id != id);
  fs.writeFileSync(pathFavorito, JSON.stringify(dadosAtuais));
  return getTodosFavoritos();
}

export {
  getTodosFavoritos,
  getFavoritoPorId,
  insereFavorito,
  modificaFavorito,
  removerFavorito,
};