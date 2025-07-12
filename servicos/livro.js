const { log } = require("console");
const fs = require("fs");
const pathLivro = "livros.json";

function getTodosLivros() {
  return JSON.parse(fs.readFileSync(pathLivro));
}

function getLivroPorId(id) {
  const livros = JSON.parse(fs.readFileSync(pathLivro));
  const livroFiltrado = livros.filter((livro) => livro.id == id)[0];
  return livroFiltrado;
}

function insereLivro(body) {
  const dadosAtuais = JSON.parse(fs.readFileSync(pathLivro));
  fs.writeFileSync(pathLivro, JSON.stringify([...dadosAtuais, body]));
  return JSON.parse(fs.readFileSync(pathLivro));
}

function modificaLivro(modicacoes, id) {
  let livroAtuais = getTodosLivros();
  const index = livroAtuais.findIndex(livro => livro.id == id);
  const conteudo = { ...livroAtuais[index], ...modicacoes };
  livroAtuais[index] = conteudo;
  fs.writeFileSync(pathLivro, JSON.stringify(livroAtuais));
  return getTodosLivros();
}

function removeLivro(id) {
  let livrosAtuais = getTodosLivros();
  livrosAtuais = livrosAtuais.filter(livro => livro.id != id);  
  fs.writeFileSync(pathLivro, JSON.stringify(livrosAtuais));
  return getTodosLivros();
}

module.exports = {
  getTodosLivros,
  getLivroPorId,
  insereLivro,
  modificaLivro,
  removeLivro
};
