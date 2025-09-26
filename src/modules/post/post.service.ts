import { Post, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
  const post = await prisma.post.create({
    data: payload,
  });

  return post;
};

const getPosts = async () => {
  const post = await prisma.post.findMany({
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

export const postService = { createPost, getPosts, getPostByID };
