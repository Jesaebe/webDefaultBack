import livros from "../models/Livros.js";

async function getTodosLivros() {  
  return await livros.find({});
}

async function getLivroPorId(id) {
  return await livros.findById(id);
}

async function insereLivro(body) {  
  await livros.create(body);
  return await getTodosLivros();
}

async function modificaLivro(modicacoes, id) {
  await livros.findByIdAndUpdate(id, modicacoes);
  return await getTodosLivros();
}

async function removeLivro(id) {
  await livros.findByIdAndDelete(id);
  return await getTodosLivros();
}

export {
  getTodosLivros,
  getLivroPorId,
  insereLivro,
  modificaLivro,
  removeLivro,
};
