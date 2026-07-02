import type { Request, Response } from "express";
import {criarEstabelecimentoHelper} from "../../helpers/estabelecimento/criarEstabelecimentoHelper.js";

export async function criarEstabelecimentoController(req:Request, res:Response){
    try{
        const{
            cnpj,
            razaoSocial,
            nomeFantasia,
            telefone,
            email,
            cep,
            logradouro,
            numero,
            bairro,
            cidade,
            estado,
            criadoPorId,
        } = req.body;

        const estabelecimento = await criarEstabelecimentoHelper({
            cnpj,
            razaoSocial,
            nomeFantasia,
            telefone,
            email,
            cep,
            logradouro,
            numero,
            bairro,
            cidade,
            estado,
            criadoPorId,
        });

        return res.status(201).json(estabelecimento);
    }catch(error){
        return res.status(400).json({
           error:
                error instanceof Error ? error.message : "Erro ao criar estabelecimento",
        });
    }
}