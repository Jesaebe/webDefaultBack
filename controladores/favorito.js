import mongoose from "mongoose";
import {
  getTodosFavoritos,
  getFavoritoPorId,
  insereFavorito,
  modificaFavorito,
  removerFavorito,
} from "../servicos/favorito.js";

async function getFavoritos(req, res) {
  try {
    res.send(await getTodosFavoritos());
  } catch (e) {
    res.status(500).send(`CONTROLLER: ${e.message}`);
  }
}

async function getFavorito(req, res) {
  try {
    const favoritoId = req.params.id;
    if (favoritoId && mongoose.Types.ObjectId.isValid(favoritoId)) {
      res.send(await getFavoritoPorId(favoritoId));
    } else {
      res.status(422).send("ID inválido");
    }
  } catch (e) {
    res.status(500).send(`CONTROLLER: ${e.message}`);
  }
}

async function postFavorito(req, res) {
  try {
    const favoritoNovo = req.body;
    if (favoritoNovo.nome) {
      res.status(201).send(await insereFavorito(favoritoNovo));
    } else {
      res.status(422).send("O campo nome é obrigatório");
    }
  } catch (e) {
    res.status(500).send(`CONTROLLER: ${e.message}`);
  }
}

async function patchFavorito(req, res) {
  try {
    const favoritoId = req.params.id;
    const favoritoModificado = req.body;
    if (favoritoId && mongoose.Types.ObjectId.isValid(favoritoId) && favoritoModificado) {
      res.status(200).send(await modificaFavorito(favoritoModificado, favoritoId));
    } else {
      res.status(422).send("ID inválido");
    }
  } catch (e) {
    res.status(500).send(`CONTROLLER: ${e.message}`);
  }
}

async function deleteFavorito(req, res) {
  try {
    const favoritoId = req.params.id;    
    if (favoritoId && mongoose.Types.ObjectId.isValid(favoritoId)) {
      res.send(await removerFavorito(favoritoId));
    } else {
      res.status(422).send("ID inválido");
    }
  } catch (e) {
    res.status(500).send(`CONTROLLER: ${e.message}`);
  }
}

export {
  getFavoritos,
  getFavorito,
  insereFavorito,
  postFavorito,
  patchFavorito,
  deleteFavorito,
};
