const express = require("express");
const app = express();
const port = 8001;
const rotaLivro = require('./rotas/livro')

app.listen(port, () =>{
  console.log(`Escutando a porta ${port}`);
})

app.use('/livros', rotaLivro)