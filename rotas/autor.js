import { Router } from "express";
import {
  getAutores,
  getAutor,
  postAutor,
  patchAutor,
  deleteAutor,
} from "../controladores/autor.js";
const router = Router();

router.get("/", getAutores);

router.get("/:id", getAutor);

router.post("/", postAutor);

router.patch("/:id", patchAutor);

router.delete("/:id", deleteAutor);

export default router;
