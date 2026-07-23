import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

interface tokenPayload extends JwtPayload{
    email: string;
    perfil: string;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction){
    const authorization = req.headers.authorization;

    if(!authorization){
        return res.status(400).json({
            error: "Token não informado",
        });
    }

    const [tipo, token] = authorization.split(" ");

    if(tipo !== "Bearer" || !token){
        return res.status(400).json({
            error: "Token inválido",
        });
    }

    const jwtSecret = process.env.JWT_SECRET;

    if(!jwtSecret){
        return res.status(500).json({
            error: "JWT Secret não configurado",
        });
    }

    try{
        const payload = jwt.verify(token, jwtSecret) as tokenPayload;

        req.usuario = {
            id: payload.sub as string,
            email: payload.email,
            perfil: payload.perfil,
        };

        return next();
    }catch{
        return res.status(401).json({
            error: "Token inválido ou expirado",
        });
    }
}