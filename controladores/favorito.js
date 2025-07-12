const {
  getTodosFavoritos,
  getFavoritoPorId,
  insereFavorito,
  modificaFavorito,
  removerFavorito,
} = require("../servicos/favorito");

async function getFavoritos(req, res) {
  try {
    const favoritos = await getTodosFavoritos();
    res.send(favoritos[0]);
  } catch (e) {
    res.status(500).send(`CONTROLLER: ${e.message}`);
  }
}

async function getFavorito(req, res) {
  try {
    const favoritoId = req.params.id;
    if (favoritoId && Number(favoritoId)) {
      const favorito = await getFavoritoPorId(favoritoId);
      if (!favorito) {
        return res.status(404).send("Favorito não encontrado!");
      }
      res.send(favorito[0]);
    } else {
      res.status(422).send("ID inválido");
    }
  } catch (e) {
    res.status(500).send(`CONTROLLER: ${e.message}`);
  }
}

function postFavorito(req, res) {
  try {
    const favoritoNovo = req.body;
    const favoritoCriado = insereFavorito(favoritoNovo);
    res.status(201).send(favoritoCriado);
  } catch (e) {
    res.status(500).send(`CONTROLLER: ${e.message}`);
  }
}

async function patchFavorito(req, res) {
  try {
    const favoritoId = req.params.id;
    if (favoritoId && Number(favoritoId)) {
      const favoritoModificado = req.body;
      const todosFavoritos = await modificaFavorito(favoritoModificado, favoritoId);
      res.status(200).send(todosFavoritos[0]);
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
    if (favoritoId && Number(favoritoId)) {
      const todosFavoritos = await removerFavorito(favoritoId);
      res.status(200).send(todosFavoritos[0]);
    } else {
      res.status(422).send("ID inválido");
    }
  } catch (e) {
    res.status(500).send(`CONTROLLER: ${e.message}`);
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
