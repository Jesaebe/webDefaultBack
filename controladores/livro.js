const {
  getTodosLivros,
  getLivroPorId,
  insereLivro,
  modificaLivro,
  removeLivro,
} = require("../servicos/livro");

async function getLivros(req, res) {
  try {
    const livros = await getTodosLivros();
    res.send(livros[0]);
  } catch (e) {
    res.status(500).send(error.message);
  }
}

async function getLivro(req, res) {
  try {
    const livroId = req.params.id;
    if (livroId && Number(livroId)) {
      const livros = await getLivroPorId(livroId);
      if (!livros) {
        return res.status(404).send("Livro não encontrado!");
      }
      res.send(livros[0]);
    } else {
      res.status(422).send("ID inválido");
    }
  } catch (e) {
    res.status(500).send(error.message);
  }
}

async function postLivro(req, res) {
  try {
    const livroNovo = req.body;
    const livroCriado = await insereLivro(livroNovo);
    res.status(201).send(livroCriado);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function patchLivro(req, res) {
  try {
    const livroId = req.params.id;
    if (livroId && Number(livroId)) {
      const livroModificado = req.body;
      const todosLivros = await modificaLivro(livroModificado, livroId);
      res.status(200).send(todosLivros[0]);
    } else {
      res.status(422).send("ID inválido");
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function deleteLivro(req, res) {
  try {
    const livroId = req.params.id;
    if (livroId && Number(livroId)) {
      const todosLivros = await removeLivro(livroId);
      res.status(200).send(todosLivros[0]);
    } else {
      res.status(422).send("ID inválido");
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
}

module.exports = {
  getLivros,
  getLivro,
  postLivro,
  patchLivro,
  deleteLivro,
};
