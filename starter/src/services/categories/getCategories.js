// import categoryData from "../../data/categories.json" assert { type: "json" };

// const getCategories = () => {
//   return categoryData.categories;
// };

import { PrismaClient } from "@prisma/client";

const getCategories = async () => {
  const prisma = new PrismaClient();
  const categories = await prisma.category.findMany();

  return categories;
};

export default getCategories;
