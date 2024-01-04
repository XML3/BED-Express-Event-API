// import userData from "../../data/users.json" assert { type: "json" };

// const deleteUser = (id) => {
//   const userIndex = userData.users.findIndex((user) => user.id === Number(id));

//   if (userIndex === -1) {
//     return null;
//   }

//   userData.users.splice(userIndex, 1);
//   return Number(id);
// };

import { PrismaClient } from "@prisma/client";

const deleteUser = async (id) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.deleteMany({
    where: { id },
  });

  if (user.count > 0) {
    return id;
  } else {
    return null;
  }
};

export default deleteUser;
