import type { NextFunction, Request, Response } from "express";

type Perfil = "USUARIO" | "GERENTE" | "ADMIN";

export function perfilMiddleware(...perfisPermitidos: Perfil[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    const usuario = req.usuario;

    if (!usuario) {
      return res.status(401).json({
        error: "Usuário não autenticado",
      });
    }

    if (!perfisPermitidos.includes(usuario.perfil as Perfil)) {
      return res.status(403).json({
        error: "Você não possui permissão para acessar esta rota",
      });
    }

    return next();
  };
}
