import type { Request, Response } from "express";
import {buscarEstabelecimentoPorIdHelper} from "../../helpers/estabelecimento/buscarEstabelecimentoPorIdHelper.js";

export async function buscarEstabelecimentoPorIdController(req:Request, res:Response){
    try{

        const { id } = req.params;

        if(!id || Array.isArray(id)){
            return res.status(400).json({
                error: "ID inválido ou inexistente",
            })
        }
        const estabelecimento = await buscarEstabelecimentoPorIdHelper(id);

        return res.status(200).json(estabelecimento);
    }catch(error){
        return res.status(400).json({
            error:
                error instanceof Error ? error.message : "Erro ao buscar estabelecimento",
        })
    }
}