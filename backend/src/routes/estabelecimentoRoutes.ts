import {Router} from 'express';
import {criarEstabelecimentoController} from "../controllers/estabelecimento/criarEstabelecimentoController.js";

const rotasEstabelecimento = Router();

rotasEstabelecimento.post("/", criarEstabelecimentoController);

export default rotasEstabelecimento;