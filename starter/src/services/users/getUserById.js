import prisma from "../../../lib/prismaClient.js";

const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      select: {
        id: true,
        name: true,
        image: true,
      },
    },
  });

  return user;
};

export default getUserById;
