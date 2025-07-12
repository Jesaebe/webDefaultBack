const {
  getTodosFavoritos,
  getFavoritoPorId,
  insereFavorito,
  modificaFavorito,
  removerFavorito,
} = require("../servicos/favorito");

function getFavoritos(req, res) {
  try {
    res.send(getTodosFavoritos());
  } catch (e) {
    res.status(200);
    res.send(`CONTROLLER: ${e.message}`);
  }
}

function getFavorito(req, res) {
  try {
    const favoritoId = req.params.id;
    if (favoritoId && Number(favoritoId)) {
      res.send(getFavoritoPorId(favoritoId));
    } else {
      res.status(422);
      res.send("ID inválido");
    }
  } catch (e) {
    res.status(500);
    res.send(`CONTROLLER: ${e.message}`);
  }
}

function postFavorito(req, res) {
  try {
    const favoritoNovo = req.body;
    if (favoritoNovo.nome) {
      const todosFavoritos = insereFavorito(favoritoNovo);
      res.status(201);
      res.send(todosFavoritos);
    } else {
      res.status(422);
      res.send("O campo nome é obrigatório");
    }
  } catch (e) {
    res.status(500);
    res.send(`CONTROLLER: ${e.message}`);
  }
}

function patchFavorito(req, res) {
  try {
    const favoritoId = req.params.id;
    if (favoritoId && Number(favoritoId)) {
      const favoritoModificado = req.body;
      const todosFavoritos = modificaFavorito(favoritoModificado, favoritoId);
      res.status(200);
      res.send(todosFavoritos);
    } else {
      res.status(422);
      res.send("ID inválido");
    }
  } catch (e) {
    res.status(500);
    res.send(`CONTROLLER: ${e.message}`);
  }
}

function deleteFavorito(req, res) {
  try {
    const favoritoId = req.params.id;
    if (favoritoId && Number(favoritoId)) {
      const todosFavoritos = removerFavorito(favoritoId);
      res.status(200);
      res.send(todosFavoritos);
    } else {
      res.status(422);
      res.send("ID inválido");
    }
  } catch (e) {
    res.status(500);
    res.send(`CONTROLLER: ${e.message}`);
  }
}

module.exports = {
  getFavoritos,
  getFavorito,
  insereFavorito,
  postFavorito,
  patchFavorito,
  deleteFavorito,
};
