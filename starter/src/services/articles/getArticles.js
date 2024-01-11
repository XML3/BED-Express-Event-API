import { PrismaClient } from "@prisma/client";

const getArticles = async () => {
  const prisma = new PrismaClient();

  const articles = await prisma.articles.findMany();

  return articles;
};

export default getArticles;
