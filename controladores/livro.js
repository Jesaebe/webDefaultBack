import mongoose from "mongoose";
import {
  getTodosLivros,
  getLivroPorId,
  insereLivro,
  modificaLivro,
  removeLivro,
  listarLivrosPorEditora,
} from "../servicos/livro.js";

import { getAutorPorId } from "../servicos/autor.js";


async function getLivros(req, res) {
  try {  
    res.send(await getTodosLivros());
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function getLivro(req, res) {
  try {
    const livroId = req.params.id;    
    if (livroId && mongoose.Types.ObjectId.isValid(livroId)) {
      res.send(await getLivroPorId(livroId));
    } else {
      res.status(422).send("ID inválido");
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function getLivroPorEditora(req, res) {
  const editora = req.query.editora;  
  try {
    res.send(await listarLivrosPorEditora(editora));
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function postLivro(req, res) {
  try {
    const livroNovo = req.body;
    if (livroNovo.nome) {
      
      const autorEncontrado = await getAutorPorId(livroNovo.autor);
      const livroCompleto = {...livroNovo, autor: { ...autorEncontrado._doc}}
      res.status(201).send(await insereLivro(livroCompleto));
    } else {
      res.status(422).send("O campo nome é obrigatório");
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function patchLivro(req, res) {
  try {
    const livroId = req.params.id;
    const livroModificado = req.body;
    if (livroId && mongoose.Types.ObjectId.isValid(livroId) && livroModificado) {
      res.status(200).send(await modificaLivro(livroModificado, livroId));
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
    if (livroId && mongoose.Types.ObjectId.isValid(livroId)) {
      res.status(200).send(await removeLivro(livroId));
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
  getLivroPorEditora,
  postLivro,
  patchLivro,
  deleteLivro,
};
