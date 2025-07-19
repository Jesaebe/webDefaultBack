import mongoose from "mongoose";
import {
  getTodosAutores,
  getAutorPorId,
  insereAutor,
  modificaAutor,
  removeAutor,
} from "../servicos/autor.js";

async function getAutores(req, res) {
  try {  
    res.send(await getTodosAutores());
  } catch (e) {
    res.status(500).send(error.message);
  }
}

async function getAutor(req, res) {
  try {
    const autorId = req.params.id;    
    if (autorId && mongoose.Types.ObjectId.isValid(autorId)) {
      res.send(await getAutorPorId(autorId));
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
    console.log(autorNovo);
    
    if (autorNovo.nome) {
      res.status(201).send(await insereAutor(autorNovo));
    } else {
      res.status(422).send("O campo nome é obrigatório");
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function patchAutor(req, res) {
  try {
    const autorId = req.params.id;
    const autorModificado = req.body;
    if (autorId && mongoose.Types.ObjectId.isValid(autorId) && autorModificado) {
      res.status(200).send(await modificaAutor(autorModificado, autorId));
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
    if (autorId && mongoose.Types.ObjectId.isValid(autorId)) {
      res.status(200).send(await removeAutor(autorId));
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
  postAutor,
  patchAutor,
  deleteAutor,
};
