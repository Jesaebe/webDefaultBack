const pathLivro = "livros.json";
const fs = require("fs");
const dadosAtuais = JSON.parse(fs.readFileSync(pathLivro));
const novoDado = {
  id: 3,
  nome: 'Livro mais que demais'
}

fs.writeFileSync(pathLivro, JSON.stringify([...dadosAtuais, novoDado]));
const dadoNovo = JSON.parse(fs.readFileSync(pathLivro));
console.log(dadoNovo);
