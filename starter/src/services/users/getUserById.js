import prisma from "../../../lib/prismaClient.js";

const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  return user;
};

export default getUserById;
