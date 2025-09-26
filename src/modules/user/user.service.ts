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
      posts: true,
    },
  });
  return users;
};

const getUserByID = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
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
      posts: true,
    },
  });

  return user;
};

const updateUser = async (
  id: number,
  payload: Prisma.UserUpdateInput
): Promise<User> => {
  const user = await prisma.user.update({
    where: { id },
    data: payload,
  });

  return user;
};

export const userService = { createUser, getUsers, getUserByID, updateUser };
