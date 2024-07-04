import prisma from "../../../lib/prismaClient.js";

const createCategory = async (name) => {
  return prisma.category.create({
    data: {
      name,
    },
  });
};

export default createCategory;
