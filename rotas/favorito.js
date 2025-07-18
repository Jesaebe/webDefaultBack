import { Router } from "express";
import {
  getFavoritos,
  getFavorito,
  postFavorito,
  patchFavorito,
  deleteFavorito,
} from "../controladores/favorito.js";
const router = Router();

router.get("/", getFavoritos);

router.get("/:id", getFavorito);

router.post("/", postFavorito);

router.patch("/:id", patchFavorito);

router.delete("/:id", deleteFavorito);

export default router;
