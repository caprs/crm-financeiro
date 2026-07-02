import prisma from "../../config/prisma.js";

export async function buscarEstabelecimentoPorIdHelper(id: string){
    const estabelecimento = await prisma.estabelecimento.findUnique({
        where:{
            id,
        },
        include:{
            criadoPor: true,
            usuarios:true,
        },
    });

    if(!estabelecimento){
        throw new Error("Estabelecimento não encontrado");  
    }

return estabelecimento;
}