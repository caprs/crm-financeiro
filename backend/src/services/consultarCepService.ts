import axios from "axios";
import viaCep from "./viaCep.js";

interface viaCepResponse{
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    erro?:boolean;
}

export async function consultarCepService(cep:string){
    try{
        const cepLimpo = cep.replace(/\D/g, "");

        const response = await viaCep.get<viaCepResponse>(`/${cepLimpo}/json/`);

        if(response.data.erro){
            throw new Error("CEP não encontrado na ViaCEP");
        }

        return{
            cep: response.data.cep.replace(/\D/g, ""),
            logradouro: response.data.logradouro,
            bairro: response.data.bairro,
            cidade: response.data.localidade,
            estado: response.data.uf,
        };
    }catch(error){
        if(axios.isAxiosError(error)){
            throw new Error("Erro ao consultar CEP na ViaCEP");
        }

        throw error;
    }
}

