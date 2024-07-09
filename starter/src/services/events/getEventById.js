import prisma from "../../../lib/prismaClient.js";

const getEventById = async (id) => {
  const event = await prisma.event.findUnique({
    where: {
      id,
    },
    include: {
      userId: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      categories: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  const categoryIds = event.categories.map((category) => category.id);
  const createdBy = event.userId.map((user) => user.id);
  return {
    ...event,
    categoryIds,
    createdBy,
    categories: undefined,
    userId: undefined,
  };
};

export default getEventById;
