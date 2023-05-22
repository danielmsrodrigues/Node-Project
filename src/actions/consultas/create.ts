import { Request, Response } from "express";
import { add } from "../../services/consultas";

export default async (req: Request, res: Response) => {
  const {
    startingDateTime,
    endingDateTime,
    room,
    observations,
    utenteId,
    medicoId,
  } = req.body;

  const newConsulta = await add(
    startingDateTime,
    endingDateTime,
    room,
    observations,
    utenteId,
    medicoId
  );

  return res.json(newConsulta);
};
