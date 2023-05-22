import { Request, Response } from "express";
import { update, detail } from "../../services/medicos";

export default async (request: Request, response: Response) => {
  const { id } = request.params;

  if (!(await detail(id))) {
    return response.status(404).json({
      code: 404,
      message: "Médico not found!",
    });
  }

  const medico = await update(id, request.body);

  return response.json(medico);
};
