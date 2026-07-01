import prisma from "../../config/prisma.js";

interface CriarUsuario {
  nome: string;
  email: string;
  senha: string;
}

export async function criarUsuarioHelper(data: CriarUsuario) {
  const usuarioExiste = await prisma.usuario.findUnique({
    where: {
      email: data.email,
    },
  });

  if (usuarioExiste) {
    throw new Error("Usuário já existe");
  }

  const usuario = await prisma.usuario.create({
    data: {
      nome: data.nome,
      email: data.email,
      senha: data.senha,
    },
  });

  return usuario;
}