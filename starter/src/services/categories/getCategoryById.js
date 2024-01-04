// import categoryData from "../../data/categories.json" assert { type: "json" };

// const getCategoryById = (id) => {
//   return categoryData.categories.find((category) => category.id === Number(id));
// };

import { PrismaClient } from "@prisma/client";

const getCategoryById = async (id) => {
  const prisma = new PrismaClient();
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  return category;
};

export default getCategoryById;
