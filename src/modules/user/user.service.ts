import { Prisma, User } from "@prisma/client";
import { prisma } from "../../config/db";

const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {
  const newUser = await prisma.user.create({
    data: payload,
  });

  return newUser;
};

const getUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      picture: true,
      status: true,
      role: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return users;
};

export const userService = { createUser, getUsers };
