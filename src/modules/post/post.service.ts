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
  isFeatured,
  tags,
}: {
  page: number;
  limit: number;
  search: string;
  isFeatured?: boolean;
  tags?: string[];
}) => {
  const skip = (page - 1) * limit;
  const where: any = {
    AND: [
      search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { content: { contains: search, mode: "insensitive" } },
        ],
      },
      typeof isFeatured === "boolean" && { isFeatured },
      tags && tags.length > 0 && { tags: { hasEvery: tags } },
    ].filter(Boolean),
  };
  const post = await prisma.post.findMany({
    include: { author: { select: { name: true, email: true } } },
    skip,
    take: limit,
    where,
  });

  const total = await prisma.post.count({ where });

  return {
    data: post,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
};

const getPostByID = async (id: number) => {
  console.log(id);
  return await prisma.$transaction(async (tx: any) => {
    await tx.post.update({
      where: { id: Number(id) },
      data: { views: { increment: 1 } },
    });

    return await tx.post.findUnique({
      where: { id: Number(id) },
      include: { author: { select: { name: true, email: true } } },
    });
  });
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

const getBlogStat = async () => {
  return await prisma.$transaction(async (tx) => {
    const aggregates = await tx.post.aggregate({
      _count: true,
      _sum: { views: true },
      _avg: { views: true },
      _max: { views: true },
      _min: { views: true },
    });

    const featuredCount = await tx.post.count({
      where: {
        isFeatured: true,
      },
    });

    const topFeatured = await tx.post.findFirst({
      where: { isFeatured: true },
      orderBy: { views: "desc" },
    });

    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const lastWeekPostCount = await tx.post.count({
      where: {
        createdAt: {
          gte: lastWeek,
        },
      },
    });

    return {
      stats: {
        totalPosts: aggregates._count ?? 0,
        totalViews: aggregates._sum.views ?? 0,
        avgViews: aggregates._avg.views ?? 0,
        minViews: aggregates._min.views ?? 0,
        maxViews: aggregates._max.views ?? 0,
      },
      featured: {
        count: featuredCount,
        topPost: topFeatured,
      },
      lastWeekPostCount,
    };
  });
};

export const postService = {
  createPost,
  getPosts,
  getPostByID,
  updatePost,
  deletePost,
  getBlogStat,
};
