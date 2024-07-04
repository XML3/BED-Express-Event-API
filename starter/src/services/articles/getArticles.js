import prisma from "../../../lib/prismaClient.js";

const getArticles = async () => {
  const articles = await prisma.articles.findMany();

  return articles;
};

export default getArticles;
