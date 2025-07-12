const { Router } = require("express");
const { getLivros, getLivro } = require("../controladores/livro");
const router = Router();

router.get('/', getLivros)

router.get('/:id', getLivro)

router.post('/', (req, res) => {
  res.send({return: 'Você fez uma requisição POST'});
})

router.patch('/', (req, res) => {
  res.send({return: 'Você fez uma requisição PATCH'});
})

router.delete('/', (req, res) => {
  res.send({return: 'Você fez uma requisição DELETE'});
})


module.exports = router;