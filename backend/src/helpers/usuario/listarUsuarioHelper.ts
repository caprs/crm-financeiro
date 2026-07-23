import prisma from "../../config/prisma.js";


export async function listarUsuariosHelper(){
    const usuarios = await prisma.usuario.findMany({ //findMany é usado para buscar vários registros no banco de dados
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

    return usuarios;
}