import type { Request, Response } from "express";
import { deletarUsuarioHelper } from "../../helpers/usuario/deletaUsuarioHelper.js";



export async function deletaUsuarioController(req: Request, res:Response){
    try{
        const { id } = req.params;

        if(!id || Array.isArray(id)){
            return res.status(400).json({
                error: "ID inválido",
            });
        }

        const resultado = await deletarUsuarioHelper(id);

        return res.status(200).json(resultado);
    }catch(error){
        return res.status(400).json({
            error:
                error instanceof Error ? error.message : "Erro ao deletar usuário",
        })
    }
}