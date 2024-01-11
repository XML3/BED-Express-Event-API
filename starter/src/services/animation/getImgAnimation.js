import { PrismaClient } from "@prisma/client";

const getImgAnimationById = async (id) => {
  const prisma = new PrismaClient();

  const imgAnimation = await prisma.imgAnimation.findUnique({
    where: {
      id,
    },
  });

  return imgAnimation;
};

export default getImgAnimationById;
