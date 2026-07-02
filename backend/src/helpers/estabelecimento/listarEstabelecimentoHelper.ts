import prisma from "../../config/prisma.js";

export async function listarEstabelecimentoHelper(){
    const estabelecimentos = await prisma.estabelecimento.findMany({
        include:{
            criadoPor: true,
            usuarios:true,
        },
    });

    return estabelecimentos;
}