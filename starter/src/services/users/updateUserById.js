import prisma from "../../../lib/prismaClient.js";

const updateUserById = async (id, updatedUser) => {
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
