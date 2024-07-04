import prisma from "../../../lib/prismaClient.js";

const getCategories = async () => {
  const categories = await prisma.category.findMany();

  return categories;
};

export default getCategories;
