import prisma from "../../config/prisma.js";


export async function listarUsuariosHelper(){
    const usuarios = await prisma.usuario.findMany({ //findMany é usado para buscar vários registros no banco de dados
        orderBy:{
            criadoEm: "desc", //ordena os registros do campo createdAt em ordem decrescente.
        },
    });

    return usuarios;
}