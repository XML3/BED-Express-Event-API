import { PirsmaClient, PrismaClient } from "@prisma/client";

const getImgAnimation = async () => {
  const prisma = new PrismaClient();

  const imgAnimation = await prisma.imgAnimation.findMany();

  return imgAnimation;
};

export default getImgAnimation;
