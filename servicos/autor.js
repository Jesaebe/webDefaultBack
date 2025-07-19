import { autor } from "../models/Autores.js";

async function getTodosAutores() {  
  return await autor.find({});
}

async function getAutorPorId(id) {
  return await autor.findById(id);
}

async function insereAutor(body) {  
  await autor.create(body);
  return await getTodosAutores();
}

async function modificaAutor(modicacoes, id) {
  await autor.findByIdAndUpdate(id, modicacoes);
  return await getTodosAutores();
}

async function removeAutor(id) {
  await autor.findByIdAndDelete(id);
  return await getTodosAutores();
}

export {
  getTodosAutores,
  getAutorPorId,
  insereAutor,
  modificaAutor,
  removeAutor,
};
