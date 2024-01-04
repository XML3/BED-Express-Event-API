// import userData from "../../data/users.json" assert { type: "json" };

// const updateUserById = (id, updatedUser) => {
//   const userIndex = userData.users.findIndex((user) => user.id === Number(id));

//   if (userIndex === -1) {
//     return null;
//   }
//   //Extract properties from `updatedUser` object
//   const { name, image, username, password } = updatedUser;

//   userData.users[userIndex] = {
//     ...userData.users[userIndex],
//     name: name || userData.users[userIndex].name,
//     image: image || userData.users[userIndex].image,
//     username: username || userData.users[userIndex].username,
//     password: password || userData.users[userIndex].password,
//   };

//   return userData.users[userIndex];
// };

import { PrismaClient } from "@prisma/client";

const updateUserById = async (id, updatedUser) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.updateMany({
    where: {
      id,
    },
    data: updatedUser,
  });

  if (user.count > 0) {
    return id;
  } else {
    return null;
  }
};

export default updateUserById;
