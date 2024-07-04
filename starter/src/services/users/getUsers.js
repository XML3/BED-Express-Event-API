import prisma from "../../../lib/prismaClient.js";

const getUsers = async () => {
  const users = await prisma.user.findMany();

  return users;
};

export default getUsers;
