import prisma from "../../config/prisma.js";


export async function excluirEstabelecimentoHelper(id:string){
    const estabelecimentoExiste = await prisma.estabelecimento.findUnique({
        where:{
            id,
        },
    });

    if(!estabelecimentoExiste){
        throw new Error("Estabelecimento não encontrado");
    }

    await prisma.$transaction([
        prisma.usuarioEstabelecimento.deleteMany({
            where:{
                estabelecimentoId: id,
            },
        }),

        prisma.estabelecimento.delete({
            where:{
                id,
            },
        }),
    ]);

    return{
        message:"Estabelecimento excluído com sucesso",
    };
}