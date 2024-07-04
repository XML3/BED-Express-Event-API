import prisma from "../../../lib/prismaClient.js";

const getImgAnimation = async () => {
  const imgAnimation = await prisma.imgAnimation.findMany();

  return imgAnimation;
};

export default getImgAnimation;
