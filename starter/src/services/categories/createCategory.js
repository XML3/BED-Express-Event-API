// import categoryData from "../../data/categories.json" assert { type: "json" };
// import { v4 as uuid } from "uuid";

// const createCategory = (name) => {
//   const newCategory = {
//     id: uuid(),
//     name,
//   };
//   categoryData.categories.push(newCategory);
//   return newCategory;
// };

import { PrismaClient } from "@prisma/client";

const createCategory = async (name) => {
  const prisma = new PrismaClient();

  return prisma.category.create({
    data: {
      name,
    },
  });
};

export default createCategory;
