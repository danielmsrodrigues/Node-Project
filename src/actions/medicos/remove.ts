import { Request, Response } from "express";
import { remove, detail } from "../../services/medicos";

export default async (request: Request, response: Response) => {
  const { id } = request.params;

  if (!(await detail(id))) {
    return response.status(404).json({
      code: 404,
      message: "Médico not found!",
    });
  }

  await remove(id);
  return response.json(`Médico with id ${id} sucessfully removed!`);
};
