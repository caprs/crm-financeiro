import prisma from "../../config/prisma.js";
import {consultarCnpjService} from "../../services/consultarCnpjService.js";
import {consultarCepService} from "../../services/consultarCepService.js";

interface criarEstabelecimento{
    cnpj: string;
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




const dadosCnpj = await consultarCnpjService(data.cnpj);
let dadosCep =  null;

if(dadosCnpj.cep){
  dadosCep = await consultarCepService(dadosCnpj.cep);
}

const estabelecimento = await prisma.estabelecimento.create({
  data: {
    cnpj: dadosCnpj.cnpj,

    razaoSocial: dadosCnpj.razao_social,
    nomeFantasia: dadosCnpj.nome_fantasia ?? null,

    telefone: dadosCnpj.ddd_telefone_1 ?? null,
    email: dadosCnpj.email ?? null,

    cep: dadosCep?.cep ?? dadosCnpj.cep,
    logradouro: dadosCep?.logradouro ?? dadosCnpj.logradouro,
    numero: dadosCnpj.numero ?? null,
    bairro: dadosCep?.bairro ?? dadosCnpj.bairro,
    cidade: dadosCep?.cidade ?? dadosCnpj.municipio,
    estado: dadosCep?.estado ?? dadosCnpj.uf,

    criadoPorId: data.criadoPorId,

    usuarios: {
      create: {
        usuarioId: data.criadoPorId,
        cargo: "GERENTE",
      },
    },
  },

  include: {
    usuarios: true,
  },
});

    return estabelecimento;
}