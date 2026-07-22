import bcrypt from "bcrypt";
import prisma from "../../config/prisma.js";
import { gerarToken} from "../../utils/jwt.js";

interface loginData{
    email: string;
    senha: string;
}

export async function loginHelper({email, senha}: loginData){
    const emailFormatado = email.toLowerCase().trim(); //criar uma tool de formatar email futuramente

    const usuario = await prisma.usuario.findUnique({
        where:{
            email:emailFormatado,
        },
    });

    if(!usuario){
        throw new Error("Email ou senha inválidos");
    }

    if(!usuario.ativo){
        throw new Error("Usuário inativo");
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if(!senhaValida){
        throw new Error("Email ou senha inválidos");
    }

    const token = gerarToken({
        id: usuario.id,
        email: usuario.email,
        perfil: usuario.perfil,
    });

    return{
        token,
        usuario: {
            id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil,
        ativo: usuario.ativo,
        }
        
    };
}