import { PrismaClient, Medico } from "@prisma/client";

export const prisma = new PrismaClient();

const all = () =>
  prisma.medico.findMany({
    where: {
      deleted: false,
    },
  });

const detail = (id: string) =>
  prisma.medico.findFirst({
    where: {
      id,
      deleted: false,
    },
  });

const add = (name: string, specialty: string) =>
  prisma.medico.create({
    data: {
      name,
      specialty,
    },
  });

const update = (id: string, medico: Medico) =>
  prisma.medico.update({
    where: { id },
    data: medico,
  });

const remove = (id: string) =>
  prisma.medico.update({
    where: { id },
    data: {
      deleted: true,
    },
  });

export { all, detail, add, update, remove };
