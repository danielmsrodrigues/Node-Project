import { Request, Response } from "express";
import { detail } from "../../services/consultas";

export default async (request: Request, response: Response) => {
  const { id } = request.params;

  const consulta = await detail(id);

  if (!consulta) {
    return response.status(404).json({
      code: 404,
      message: "Consulta not found",
    });
  }

  return response.json(consulta);
};
