import { Router } from "express";
import { listarUsuarioController } from "../controllers/usuario/listarUsuarioController.js";
import { listarUsuarioIdController } from "../controllers/usuario/listarUsuarioIdController.js";
import { atualizaUsuarioController } from "../controllers/usuario/atualizaUsuarioController.js";
import { criarUsuarioController } from "../controllers/usuario/criarUsuarioController.js";
import { deletaUsuarioController } from "../controllers/usuario/deletaUsuarioController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { perfilMiddleware } from "../middlewares/perfilMiddleware.js";

const rotasUsuario = Router();

rotasUsuario.post("/", criarUsuarioController);

rotasUsuario.use(authMiddleware);

rotasUsuario.get(
  "/",
  authMiddleware,
  perfilMiddleware("ADMIN"),
  listarUsuarioController,
);

rotasUsuario.get("/:id", listarUsuarioIdController);
rotasUsuario.put("/:id", atualizaUsuarioController);
rotasUsuario.delete("/:id", deletaUsuarioController);

export default rotasUsuario;
