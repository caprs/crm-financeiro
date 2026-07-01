import { Router } from "express";
import {listarUsuarioController} from "../controllers/usuario/listarUsuarioController.js";
import {listarUsuarioIdController} from "../controllers/usuario/listarUsuarioIdController.js";
import {atualizaUsuarioController} from "../controllers/usuario/atualizaUsuarioController.js";
import {criarUsuarioController} from "../controllers/usuario/criarUsuarioController.js";
import {deletaUsuarioController} from "../controllers/usuario/deletaUsuarioController.js";

const rotasUsuario = Router();

rotasUsuario.get("/", listarUsuarioController);
rotasUsuario.get("/:id", listarUsuarioIdController);
rotasUsuario.put("/:id", atualizaUsuarioController);
rotasUsuario.post("/", criarUsuarioController);
rotasUsuario.delete("/:id", deletaUsuarioController);

export default rotasUsuario;