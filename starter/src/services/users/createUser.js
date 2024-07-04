import prisma from "../../../lib/prismaClient.js";

const createUser = async (username, password, name, image) => {
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
