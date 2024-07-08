import prisma from "../../../lib/prismaClient.js";

const getEvents = async (title, location) => {
  const events = await prisma.event.findMany({
    where: {
      title: {
        contains: title,
      },
      location: {
        contains: location,
      },
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

  const transformedEvents = events.map((event) => ({
    ...event,
    categoryIds: event.categories.map((category) => category.id),
  }));

  return transformedEvents;
};

export default getEvents;
