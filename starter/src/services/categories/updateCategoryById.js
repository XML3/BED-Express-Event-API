import prisma from "../../../lib/prismaClient.js";

const updateCategoryById = async (id, updatedCategory) => {
  const category = await prisma.category.updateMany({
    where: {
      id,
    },
    data: updatedCategory,
  });

  if (category.count > 0) {
    return id;
  } else {
    return null;
  }
};

export default updateCategoryById;
