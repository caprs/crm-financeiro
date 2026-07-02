import {Router} from 'express';
import {criarEstabelecimentoController} from "../controllers/estabelecimento/criarEstabelecimentoController.js";
import { listarEstabelecimentoController } from '../controllers/estabelecimento/listarEstabelecimentoController.js';
import { buscarEstabelecimentoPorIdController } from '../controllers/estabelecimento/buscarEstabelecimentoPorIdController.js';
import { atualizarEstabelecimentoController } from '../controllers/estabelecimento/atualizarEstabelecimentoController.js';
import { excluirEstabelecimentoController } from '../controllers/estabelecimento/excluirEstabelecimentoController.js';

const rotasEstabelecimento = Router();

rotasEstabelecimento.post("/", criarEstabelecimentoController);
rotasEstabelecimento.get("/", listarEstabelecimentoController);
rotasEstabelecimento.get("/:id", buscarEstabelecimentoPorIdController);
rotasEstabelecimento.put("/:id", atualizarEstabelecimentoController);
rotasEstabelecimento.delete("/:id", excluirEstabelecimentoController);

export default rotasEstabelecimento;