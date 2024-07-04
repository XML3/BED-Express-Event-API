import prisma from "../../../lib/prismaClient.js";

const getCategoryById = async (id) => {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  return category;
};

export default getCategoryById;
