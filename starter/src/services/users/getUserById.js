// import userData from "../../data/users.json" assert { type: "json" };

// const getUserById = (id) => {
//   return userData.users.find((user) => user.id === Number(id));
// };

import { PrismaClient } from "@prisma/client";

const getUserById = async (id) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: { id },
  });

  return user;
};

export default getUserById;
