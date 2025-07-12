const {
  getTodosLivros,
  getLivroPorId,
  insereLivro,
  modificaLivro,
  removeLivro,
} = require("../servicos/livro");

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
    const livroId = req.params.id;
    if (livroId && Number(livroId)) {
      const livros = getLivroPorId(livroId);
      res.send(livros);
    } else {
      res.status(422);
      res.send("ID inválido");
    }
  } catch (e) {
    res.status(500);
    res.send(error.message);
  }
}

function postLivro(req, res) {
  try {
    const livroNovo = req.body;
    if (livroNovo.nome) {
      const todosLivros = insereLivro(livroNovo);
      res.status(201);
      res.send(todosLivros);
    } else {
      res.status(422);
      res.send("O campo nome é obrigatório");
    }
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }
}

function patchLivro(req, res) {
  try {
    const livroId = req.params.id;
    if (livroId && Number(livroId)) {
      const livroModificado = req.body;
      const todosLivros = modificaLivro(livroModificado, livroId);
      res.status(200);
      res.send(todosLivros);
    } else {
      res.status(422);
      res.send("ID inválido");
    }
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }
}

function deleteLivro(req, res) {
  try {
    const livroId = req.params.id;
    if (livroId && Number(livroId)) {
      const todosLivros = removeLivro(livroId);
      res.status(200);
      res.send(todosLivros);
    } else {
      res.status(422);
      res.send("ID inválido");
    }
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }
}

module.exports = {
  getLivros,
  getLivro,
  postLivro,
  patchLivro,
  deleteLivro,
};
