import axios from "axios";
import brasilApi from "./brasilApiService.js";

export async function consultarCnpjService(cnpj: string) {
  const cnpjLimpo = cnpj.replace(/\D/g, "");

  try {
   
    const response = await brasilApi.get(`/cnpj/v1/${cnpjLimpo}`);

    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
     

      if (error.response?.status === 404) {
        throw new Error("CNPJ não encontrado na BrasilAPI");
      }

      throw new Error(
        `Erro ao consultar BrasilAPI: ${
          error.response?.status ?? "sem status"
        }`
      );
    }

    throw new Error("Erro desconhecido ao consultar CNPJ");
  }
}