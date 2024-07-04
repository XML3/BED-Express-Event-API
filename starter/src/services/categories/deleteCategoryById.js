import prisma from "../../../lib/prismaClient.js";

const deleteCategory = async (id) => {
  const category = await prisma.category.deleteMany({
    where: { id },
  });

  if (category.count > 0) {
    return id;
  } else {
    return null;
  }
};

export default deleteCategory;
