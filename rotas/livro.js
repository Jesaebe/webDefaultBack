import { Router } from "express";
import {
  getLivros,
  getLivro,
  postLivro,
  patchLivro,
  deleteLivro,
  getLivrosPorNome,
} from "../controladores/livro.js";
const router = Router();

router.get("/", getLivros);

router.get("/buscar", getLivrosPorNome);

router.get("/:id", getLivro);

router.post("/", postLivro);

router.patch("/:id", patchLivro);

router.delete("/:id", deleteLivro);

export default router;
