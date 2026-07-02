import prisma from "../../config/prisma.js";

interface AtualizaEstabelecimento{
    id: string;
   cnpj?: string;
   razaoSocial?: string;
   nomeFantasia?: string;
   telefone?: string;
   email?: string;
   cep?: string;
   logradouro?: string;
   numero?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
}

export async function atualizaEstabelecimentoHelper(data: AtualizaEstabelecimento){
    const estabelecimentoExiste = await prisma.estabelecimento.findUnique({
        where:{
            id: data.id
        },
    });

    if(!estabelecimentoExiste){
        throw new Error("Estabelecimento não encontrado");
    }

    const dadosAtualizacao:{
   cnpj?: string;
   razaoSocial?: string;
   nomeFantasia?: string;
   telefone?: string;
   email?: string;
   cep?: string;
   logradouro?: string;
   numero?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
    } = {};

  
    if(data.cnpj !== undefined){
        dadosAtualizacao.cnpj = data.cnpj;
    }

    if(data.razaoSocial !== undefined){
        dadosAtualizacao.razaoSocial = data.razaoSocial;
    }

    if(data.nomeFantasia !== undefined){
        dadosAtualizacao.nomeFantasia = data.nomeFantasia;
    }

    if(data.telefone !== undefined){
        dadosAtualizacao.telefone = data.telefone;
    }

    if(data.email !== undefined){
        dadosAtualizacao.email = data.email;
    }

    if(data.cep !== undefined){
        dadosAtualizacao.cep = data.cep;
    }   

    if(data.logradouro !== undefined){
        dadosAtualizacao.logradouro = data.logradouro;
    }

    if(data.numero !== undefined){
        dadosAtualizacao.numero = data.numero;
    }

    if(data.bairro !== undefined){
        dadosAtualizacao.bairro = data.bairro;
    }

    if(data.cidade !== undefined){
        dadosAtualizacao.cidade = data.cidade;
    }

    if(data.estado !== undefined){
        dadosAtualizacao.estado = data.estado;
    }



    const estabelecimento = await prisma.estabelecimento.update({
        where:{
            id:data.id,
        },
        data:dadosAtualizacao,
    });

    return estabelecimento;
}