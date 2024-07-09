import prisma from "../../../lib/prismaClient.js";
import getCategoryById from "../categories/getCategoryById.js";

const getEventById = async (id) => {
  const event = await prisma.event.findUnique({
    where: {
      id,
    },
    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      getCategoryById: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return event;
};

export default getEventById;
