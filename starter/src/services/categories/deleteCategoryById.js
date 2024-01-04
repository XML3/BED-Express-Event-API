// import categoryData from "../../data/categories.json" assert { type: "json" };

// const deleteCategory = (id) => {
//   const catIndex = categoryData.categories.findIndex(
//     (category) => category.id === Number(id)
//   );

//   if (catIndex === -1) {
//     return null;
//   }

//   categoryData.categories.splice(catIndex, 1);
//   return Number(id);
// };

import { PrismaClient } from "@prisma/client";

const deleteCategory = async (id) => {
  const prisma = new PrismaClient();
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
