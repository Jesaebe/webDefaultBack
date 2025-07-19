import fs from "fs";
const pathLivro = "livros.json";

function getTodosLivros() {
  return JSON.parse(fs.readFileSync(pathLivro));
}

function getLivroPorId(id) {
  const livros = getTodosLivros();
  return livros.filter((livro) => livro.id == id)[0];
}

function insereLivro(body) {
  const dadosAtuais = getTodosLivros();
  fs.writeFileSync(pathLivro, JSON.stringify([...dadosAtuais, body]));
  return getTodosLivros();
}

function modificaLivro(modicacoes, id) {
  let livroAtuais = getTodosLivros();
  const index = livroAtuais.findIndex((livro) => livro.id == id);
  livroAtuais[index] = { ...livroAtuais[index], ...modicacoes };
  fs.writeFileSync(pathLivro, JSON.stringify(livroAtuais));
  return getTodosLivros();
}

function removeLivro(id) {
  let livrosAtuais = getTodosLivros();
  livrosAtuais = livrosAtuais.filter((livro) => livro.id != id);
  fs.writeFileSync(pathLivro, JSON.stringify(livrosAtuais));
  return getTodosLivros();
}

export {
  getTodosLivros,
  getLivroPorId,
  insereLivro,
  modificaLivro,
  removeLivro,
};
