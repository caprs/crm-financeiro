import bcrypt from "bcrypt";
import prisma from "../../config/prisma.js";

interface CriarUsuarioData {
  nome: string;
  email: string;
  senha: string;
}

export async function criarUsuarioHelper(data: CriarUsuarioData) {
  const emailFormatado = data.email.trim().toLowerCase();

  const usuarioExistente = await prisma.usuario.findUnique({
    where: {
      email: emailFormatado,
    },
  });

  if (usuarioExistente) {
    throw new Error("Usuário já existe");
  }

  if (!data.senha || data.senha.length < 6) {
    throw new Error("A senha deve possuir pelo menos 6 caracteres");
  }

  const senhaCriptografada = await bcrypt.hash(data.senha, 10);

  const usuario = await prisma.usuario.create({
    data: {
      nome: data.nome.trim(),
      email: emailFormatado,
      senha: senhaCriptografada,
    },
    select: {
      id: true,
      nome: true,
      email: true,
      perfil: true,
      ativo: true,
      criadoEm: true,
      atualizadoEm: true,
    },
  });

  return usuario;
}