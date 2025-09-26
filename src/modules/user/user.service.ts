import { prisma } from "../../config/db";

const createUser = async (payload: any) => {
  const newUser = await prisma.user.create({
    data: payload,
  });

  return newUser;
};

export const userService = { createUser };
