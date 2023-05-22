import { Request, Response } from "express";
import { add } from "../../services/medicos";

export default async (request: Request, response: Response) => {
  const { name, specialty } = request.body;

  const newMedico = await add(name, specialty);

  return response.json(newMedico);
};
