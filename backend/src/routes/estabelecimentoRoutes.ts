import {Router} from 'express';
import {criarEstabelecimentoController} from "../controllers/estabelecimento/criarEstabelecimentoController.js";
import { listarEstabelecimentoController } from '../controllers/estabelecimento/listarEstabelecimentoController.js';
import { buscarEstabelecimentoPorIdController } from '../controllers/estabelecimento/buscarEstabelecimentoPorIdController.js';
import { atualizarEstabelecimentoController } from '../controllers/estabelecimento/atualizarEstabelecimentoController.js';

const rotasEstabelecimento = Router();

rotasEstabelecimento.post("/", criarEstabelecimentoController);
rotasEstabelecimento.get("/", listarEstabelecimentoController);
rotasEstabelecimento.get("/:id", buscarEstabelecimentoPorIdController);
rotasEstabelecimento.put("/:id", atualizarEstabelecimentoController);   

export default rotasEstabelecimento;