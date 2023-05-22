import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient();

export async function register(
  username: string,
  password: string,
  firstName?: string
) {
  const user = await prisma.user.create({
    data: {
      username,
      password: await bcrypt.hash(password, 8),
      profile: {
        create: {
          firstName,
        },
      },
    },
  });

  return createToken(user);
}

export const findById = async (id: string) =>
  prisma.user.findUnique({
    where: { id },
    include: { profile: true },
  });

export async function attemptLogin(username: string, password: string) {
  const user = await prisma.user.findFirst({
    where: {
      username,
      deleted: false,
    },
  });

  const match = user && (await bcrypt.compare(password, user.password));

  if (!user || !match) {
    throw new Error("Bad credentials");
  }

  return createToken(user);
}

function createToken(user: User): string {
  const token = sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 180,
      username: user.username,
      user_id: user.id,
    },
    "SecretKey"
  );

  return token;
}
