import prisma from "../../../lib/prismaClient.js";

const deleteUser = async (id) => {
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
