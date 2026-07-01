import prisma from "../../config/prisma.js";

export async function deletarUsuarioHelper(id:string){
    const usuarioExiste = await prisma.usuario.findUnique({
        where:{
            id,
        },
    });

    if(!usuarioExiste){
        throw new Error("Usuário não encontrado");
    }

    await prisma.usuario.delete({
        where:{
            id,
        },
    });

    return{
        message: "Usuário deletado com sucesso",
    };
}