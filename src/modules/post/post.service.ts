import { Post, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
  const post = await prisma.post.create({
    data: payload,
  });

  return post;
};

const getPosts = async ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search: string;
}) => {
  const skip = (page - 1) * limit;
  const post = await prisma.post.findMany({
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    skip,
    take: limit,
    where: {
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },
  });
  return post;
};

const getPostByID = async (id: number) => {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return post;
};

const updatePost = async (
  id: number,
  payload: Prisma.PostUpdateInput
): Promise<Post> => {
  const post = await prisma.post.update({
    where: { id },
    data: payload,
  });

  return post;
};

const deletePost = async (id: number): Promise<Post> => {
  const post = await prisma.post.delete({
    where: { id },
  });

  return post;
};

export const postService = {
  createPost,
  getPosts,
  getPostByID,
  updatePost,
  deletePost,
};
