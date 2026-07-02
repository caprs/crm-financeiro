import type { Request, Response } from "express";
import {listarEstabelecimentoHelper} from "../../helpers/estabelecimento/listarEstabelecimentoHelper.js";

export async function listarEstabelecimentoController(req:Request, res:Response){
    try{
        const estabelecimentos = await listarEstabelecimentoHelper();

        return res.status(200).json(estabelecimentos);
    }catch(error){
        return res.status(400).json({
            error:
                error instanceof Error ? error.message : "Erro ao listar estabelecimentos",
        })
    }
}