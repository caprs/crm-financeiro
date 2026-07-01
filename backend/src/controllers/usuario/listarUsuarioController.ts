import type { Request, Response } from "express";
import { listarUsuariosHelper } from "../../helpers/usuario/listarUsuarioHelper.js";

export async function listarUsuarioController(req: Request, res: Response){
    try{
        const usuarios = await listarUsuariosHelper();

        return res.status(200).json(usuarios);
    }catch(error){
        return res.status(400).json({
            error:
                error instanceof Error ? error.message : "Erro ao listar usuários",
        });
    }
}