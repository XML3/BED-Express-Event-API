// import userData from "../../data/users.json" assert { type: "json" };
// import { v4 as uuid } from "uuid";

// const createUser = (name, image, username, password) => {
//   const newUser = {
//     id: uuid(),
//     name,
//     image,
//     username,
//     password,
//   };

//   userData.users.push(newUser);
//   return newUser;
// };

import { PrismaClient } from "@prisma/client";

const createUser = async (username, password, name, image) => {
  const prisma = new PrismaClient();

  return prisma.user.create({
    data: {
      username,
      password,
      name,
      image,
    },
  });
};

export default createUser;
