import { Request, Response } from "express";
import { add } from "../../services/utentes";

export default async (request: Request, response: Response) => {
  const { name, age, gender, adress, contact } = request.body;

  const newProduct = await add(name, age, gender, adress, contact);

  return response.json(newProduct);
};
