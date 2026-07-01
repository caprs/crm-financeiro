import prisma from "../../config/prisma.js";

export async function listarUsuarioIdHelper(id: string){
    const usuario = await prisma.usuario.findUnique({
        where:{
            id,
        },
    });

    if(!usuario){
        throw new Error("Usuário não encontrado");
    }

    return usuario;
}
