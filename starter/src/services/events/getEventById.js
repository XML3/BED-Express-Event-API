import prisma from "../../../lib/prismaClient.js";

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
      categories: {
        select: {
          id: true,
        },
      },
    },
  });

  const transformedEvent = events.map((event) => ({
    ...event,
    categoryIds: event.categories.map((category) => category.id),
  }));
  return transformedEvent;
};

export default getEventById;
