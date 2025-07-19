import favorito from "../models/Favoritos.js";

async function getTodosFavoritos() {
  return await favorito.find({});
}

async function getFavoritoPorId(id) {
  return await favorito.findById(id);
}

async function insereFavorito(body) {
  await favorito.create(body);
  return await getTodosFavoritos();
}

async function modificaFavorito(modificacoes, id) {
  await favorito.findByIdAndUpdate(id, modificacoes);
  return await getTodosFavoritos();
}

async function removerFavorito(id) {
  await favorito.findByIdAndDelete(id);
  return await getTodosFavoritos();
}

export {
  getTodosFavoritos,
  getFavoritoPorId,
  insereFavorito,
  modificaFavorito,
  removerFavorito,
};