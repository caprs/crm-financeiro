import type { Request, Response } from "express";
import { listarUsuarioIdHelper } from "../../helpers/usuario/listarUsuarioIdHelper.js";

export async function listarUsuarioIdController(req: Request, res: Response){
    try{
        const { id } = req.params;

       if(!id || Array.isArray(id)){
            return res.status(400).json({
                error: "ID inválido",
            });
        }

        const usuario = await listarUsuarioIdHelper(id);

        return res.status(200).json(usuario);
    } catch(error){
        return res.status(400).json({
            error:
                error instanceof Error ? error.message : "Erro ao buscar usuário",
        });
    }
}
