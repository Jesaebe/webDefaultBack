import { getAutorByNome } from "../servicos/autor.js";
import {
  getTodosLivros,
  getLivroPorId,
  insereLivro,
  modificaLivro,
  removeLivro,
  getLivroByNome,
} from "../servicos/livro.js";


async function getLivros(req, res) {
  try {
    const livros = await getTodosLivros();
    res.send(livros[0]);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function getLivrosPorNome(req, res) {
  const nomeLivro = req.query.nome;
  try {
    const livros = await getLivroByNome(nomeLivro);
    res.send(livros[0]);
  } catch (e) {
    res.status(500).send(e.message);
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
    res.status(500).send(e.message);
  }
}

async function postLivro(req, res) {
  try {
    const livroNovo = req.body;   
    const idAutor = await getAutorByNome(livroNovo.autor);    
    const livroCriado = await insereLivro({...livroNovo, autor: idAutor[0][0].id});
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

export {
  getLivros,
  getLivro,
  getLivrosPorNome,
  postLivro,
  patchLivro,
  deleteLivro,
};
