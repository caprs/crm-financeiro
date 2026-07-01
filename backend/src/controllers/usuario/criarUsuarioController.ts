import { criarUsuarioHelper } from "../../helpers/usuario/criarUsuarioHelper.js";
import type { Request, Response } from "express";


export async function criarUsuarioController(req: Request, res:Response){
    try{
        const { nome, email, senha } = req.body;

        const usuario = await criarUsuarioHelper({ nome, email, senha });

        return res.status(201).json(usuario);
    } catch (error) {
        return res.status(400).json({
            error:
                error instanceof Error 
                ? error.message
                : "Erro ao criar usuário",
        });
    }
}