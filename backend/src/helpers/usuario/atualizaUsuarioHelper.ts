import prisma from "../../config/prisma.js";

interface AtualizaUsuario{
    id: string;
    nome?: string;
    email?: string;
    senha?: string;
}

export async function atualizaUsuarioHelper(data: AtualizaUsuario){
  const usuarioExiste = await prisma.usuario.findUnique({
    where: {
      id: data.id,
    },
  });

  if (!usuarioExiste) {
    throw new Error("Usuário não encontrado");
  }

  const dadosAtualizacao:{
    nome?: string;
    email?: string;
    senha?: string;
  } ={};

  if(data.nome !== undefined){
    dadosAtualizacao.nome = data.nome;
  }

  if(data.email !== undefined){
    dadosAtualizacao.email = data.email;
  }

  if(data.senha !== undefined){
    dadosAtualizacao.senha = data.senha;
  }

  const user = await prisma.usuario.update({
    where: {
      id: data.id,
    },
    data: dadosAtualizacao,
  });

  return user;
}