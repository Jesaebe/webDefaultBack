import { Router } from "express";
import { deleteAutor, getAutor, getAutores, getAutorPorNome, patchAutor, postAutor } from "../controladores/autor.js";

const router = Router();

router.get("/", getAutores);

router.get("/buscar", getAutorPorNome);

router.get("/:id", getAutor);

router.post("/", postAutor);

router.patch("/:id", patchAutor);

router.delete("/:id", deleteAutor);

export default router;
