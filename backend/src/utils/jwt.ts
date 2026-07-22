import jwt from "jsonwebtoken";

interface gerarTokenData{
    id: string;
    email: string;
    perfil: string;
}

export function gerarToken(data: gerarTokenData): string{
    const jwtSecret = process.env.JWT_SECRET;

    if(!jwtSecret){
        throw new Error("JWT_SECRET não configurada");
    }

    return jwt.sign(
        {
            email: data.email,
            perfil: data.perfil,
        },
        jwtSecret,
        {
            subject: data.id,
            expiresIn: "1d",
        },
    );
}