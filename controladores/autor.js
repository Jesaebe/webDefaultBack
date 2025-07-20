import { getAutorByNome, getAutorPorId, getTodosAutores, insereAutor, modificaAutor, removeAutor } from "../servicos/autor.js";


async function getAutores(req, res) {
  try {
    const autores = await getTodosAutores();
    res.send(autores[0]);
  } catch (e) {
    res.status(500).send(error.message);
  }
}

async function getAutor(req, res) {
  try {
    const autorId = req.params.id;
    if (autorId && Number(autorId)) {
      const autores = await getAutorPorId(autorId);
      if (!autores) {
        return res.status(404).send("Autor não encontrado!");
      }
      res.send(autores[0]);
    } else {
      res.status(422).send("ID inválido");
    }
  } catch (e) {
    res.status(500).send(error.message);
  }
}

async function getAutorPorNome(req, res) {
  try {
    const autor = req.query.autor;     
    if (autor) {
      const autores = await getAutorByNome(autor);
      if (!autores) {
        return res.status(404).send("Autor não encontrado!");
      }
      res.send(autores[0]);
    } else {
      res.status(422).send("ID inválido");
    }
  } catch (e) {
    res.status(500).send(error.message);
  }
}

async function postAutor(req, res) {
  try {
    const autorNovo = req.body;
    const autorCriado = await insereAutor(autorNovo);
    res.status(201).send(autorCriado);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function patchAutor(req, res) {
  try {
    const autorId = req.params.id;
    if (autorId && Number(autorId)) {
      const autorModificado = req.body;
      const todosAutores = await modificaAutor(autorModificado, autorId);
      res.status(200).send(todosAutores[0]);
    } else {
      res.status(422).send("ID inválido");
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function deleteAutor(req, res) {
  try {
    const autorId = req.params.id;
    if (autorId && Number(autorId)) {
      const todosAutores = await removeAutor(autorId);
      res.status(200).send(todosAutores[0]);
    } else {
      res.status(422).send("ID inválido");
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
}

export {
  getAutores,
  getAutor,
  getAutorPorNome,
  postAutor,
  patchAutor,
  deleteAutor,
};
