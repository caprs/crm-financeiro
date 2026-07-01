import prisma from "../../config/prisma.js";

interface criarEstabelecimento{
    cnpj: string;
    razaoSocial: string;
    nomeFantasia?:string;
    telefone?:string;
    email?:string;
    cep?:string;
    logradouro?:string;
    numero?:string;
    bairro?:string;
    cidade?:string;
    estado?:string;
    criadoPorId: string;
}

export async function criarEstabelecimentoHelper(data: criarEstabelecimento){
    const usuarioExiste = await prisma.usuario.findUnique({
        where:{
            id: data.criadoPorId,
        },
    });

    if(!usuarioExiste){
        throw new Error("Usuário responsável não encontrado");
    }

    const estabelecimentoExiste = await prisma.estabelecimento.findUnique({
        where:{
            cnpj: data.cnpj,
        },
    });

    if(estabelecimentoExiste){
        throw new Error("CNPJ já cadastrado");
    }

   const dadosEstabelecimento: {
  cnpj: string;
  razaoSocial: string;
  nomeFantasia?: string;
  telefone?: string;
  email?: string;
  cep?: string;
  logradouro?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  criadoPorId: string;
  usuarios: {
    create: {
      usuarioId: string;
      cargo: "GERENTE";
    };
  };
} = {
  cnpj: data.cnpj,
  razaoSocial: data.razaoSocial,
  criadoPorId: data.criadoPorId,
  usuarios: {
    create: {
      usuarioId: data.criadoPorId,
      cargo: "GERENTE",
    },
  },
};

if (data.nomeFantasia !== undefined) dadosEstabelecimento.nomeFantasia = data.nomeFantasia;
if (data.telefone !== undefined) dadosEstabelecimento.telefone = data.telefone;
if (data.email !== undefined) dadosEstabelecimento.email = data.email;
if (data.cep !== undefined) dadosEstabelecimento.cep = data.cep;
if (data.logradouro !== undefined) dadosEstabelecimento.logradouro = data.logradouro;
if (data.numero !== undefined) dadosEstabelecimento.numero = data.numero;
if (data.bairro !== undefined) dadosEstabelecimento.bairro = data.bairro;
if (data.cidade !== undefined) dadosEstabelecimento.cidade = data.cidade;
if (data.estado !== undefined) dadosEstabelecimento.estado = data.estado;

const estabelecimento = await prisma.estabelecimento.create({
  data: dadosEstabelecimento,
  include: {
    usuarios: true,
  },
});

    return estabelecimento;
}