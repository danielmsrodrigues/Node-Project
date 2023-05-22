import { Request, Response } from "express";
import { update, detail } from "../../services/utentes";

export default async (req: Request, res: Response) => {
  const { id } = req.params;
  const { utenteId } = req.body;

  if (!(await detail(id))) {
    return res.status(404).json({
      code: 404,
      message: "Consulta not found",
    });
  }

  const consulta = await update(id, utenteId);

  return res.json(consulta);
};
