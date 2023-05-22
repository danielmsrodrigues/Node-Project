import { PrismaClient, Utente } from "@prisma/client";

export const prisma = new PrismaClient();

const all = () =>
  prisma.utente.findMany({
    where: {
      deleted: false,
    },
  });

const detail = (id: string) =>
  prisma.utente.findFirst({
    where: {
      id,
      deleted: false,
    },
  });

const add = (
  name: string,
  age: number,
  gender: string,
  adress: string,
  contact: number
) =>
  prisma.utente.create({
    data: {
      name,
      age,
      gender,
      adress,
      contact,
    },
  });

const update = (id: string, utente: Utente) =>
  prisma.utente.update({
    where: { id },
    data: utente,
  });

const remove = (id: string) =>
  prisma.utente.update({
    where: { id },
    data: {
      deleted: true,
    },
  });

export { all, detail, add, update, remove };
