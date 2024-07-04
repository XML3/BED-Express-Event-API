import prisma from "../../../lib/prismaClient.js";

const getImgAnimationById = async (id) => {
  const imgAnimation = await prisma.imgAnimation.findUnique({
    where: {
      id,
    },
  });

  return imgAnimation;
};

export default getImgAnimationById;
