import express from "express";
import rotaLivro from "./rotas/livro.js";
import rotaFavorito from "./rotas/favorito.js";
import rotaAutor from "./rotas/autor.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({origin: "*"}));

app.use("/livros", rotaLivro);
app.use("/favoritos", rotaFavorito);
app.use("/autores", rotaAutor);

const port = 8000;

app.listen(port, () => {
  console.log(`Escutando a porta ${port}`);
}); 