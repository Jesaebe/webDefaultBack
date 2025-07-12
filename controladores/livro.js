const { getTodosLivros, getLivroPorId } = require("../servicos/livro");

function getLivros(req, res) {
  try {
    const livros = getTodosLivros();
    res.send(livros);
  } catch (e) {
    res.status(500);
    res.send(error.message);
  }
}

function getLivro(req, res) {
  try {
    const livros = getLivroPorId(req.params.id);
    res.send(livros);
  } catch (e) {
    res.status(500);
    res.send(error.message);
  }
}

module.exports = {
  getLivros,
  getLivro
};
