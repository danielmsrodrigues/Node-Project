import { PrismaClient, Consulta } from "@prisma/client";

export const prisma = new PrismaClient();

const all = () =>
  prisma.consulta.findMany({
    where: {
      deleted: false,
    },
    include: {
      utente: { select: { name: true } },
      medico: { select: { name: true, specialty: true } },
    },
  });

const detail = (id: string) =>
  prisma.consulta.findFirst({
    where: { id, deleted: false },
    include: {
      utente: true,
      medico: true,
    },
  });

const add = (
  startingDateTime: string,
  endingDateTime: string,
  room: string,
  observations: string,
  utenteId: string,
  medicoId: string
) =>
  prisma.consulta.create({
    data: {
      startingDateTime,
      endingDateTime,
      room,
      observations,

      utente: {
        connect: {
          id: utenteId,
        },
      },
      medico: {
        connect: { id: medicoId },
      },
    },
    include: {
      utente: { select: { name: true } },
      medico: { select: { name: true, specialty: true } },
    },
  });

const update = (id: string, medicoId: string) =>
  prisma.consulta.update({
    where: {
      id,
    },
    data: {
      medico: {
        connect: { id: medicoId },
      },
    },
    include: {
      medico: true,
      utente: true,
    },
  });

const remove = (id: string) =>
  prisma.consulta.update({
    where: { id },
    data: {
      deleted: true,
    },
  });

export { all, detail, add, update, remove };
