import prisma from "../../config/prisma.js";

export async function listarUsuarioIdHelper(id: string){
    const usuario = await prisma.usuario.findUnique({
        where:{
            id,
        },
        select:{
            id: true,
            nome: true,
            email: true,
            perfil: true,
            ativo: true,
            criadoEm: true,
            atualizadoEm: true,
        }
    });

    if(!usuario){
        throw new Error("Usuário não encontrado");
    }

    return usuario;
}
