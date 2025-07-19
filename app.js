import express from "express";
import rotaLivro from "./rotas/livro.js";
import rotaFavorito from "./rotas/favorito.js";
import rotaAutores from "./rotas/autor.js";
import cors from "cors";
import connectDB from "./config/dbConnect.js";
import "dotenv/config";


const app = express();
app.use(express.json());
app.use(cors({origin: "*"}));

app.use("/livros", rotaLivro);
app.use("/favoritos", rotaFavorito);
app.use("/autores", rotaAutores);

const port = 8000;

const conexao = await connectDB();
conexao.on("error", (erro) => {
  console.log("Erro de conexão:", erro);  
})

conexao.once("open", () => {  
  console.log("Conexão com o banco feita com sucesso");  
})

app.listen(port, () => {
  console.log(`Escutando a porta ${port}`);
}); 