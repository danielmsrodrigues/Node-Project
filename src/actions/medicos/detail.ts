import { Request, Response } from "express";
import { detail } from "../../services/medicos";

export default async (request: Request, response: Response) => {
  const { id } = request.params;

  const medico = await detail(id);

  if (!medico) {
    return response.status(404).json({
      code: 404,
      message: "Utente not found!",
    });
  }

  return response.json(medico);
};
