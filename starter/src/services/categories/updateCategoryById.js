// import categoryData from "../../data/categories.json" assert { type: "json" };

// const updateCategoryById = (id, name) => {
//   const category = categoryData.categories.find(
//     (category) => category.id === Number(id)
//   );

//   category.name = name ?? category.name;

//   return category;
// };

import { PrismaClient } from "@prisma/client";

const updateCategoryById = async (id, updatedCategory) => {
  const prisma = new PrismaClient();
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
