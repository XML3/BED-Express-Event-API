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
          name: true,
        },
      },
    },
  });
  if (!event) return null;

  const categoryIds = event.categories.map((category) => category.id);

  const formatedEvent = {
    id: event.id,
    title: event.title,
    description: event.description,
    image: event.image,
    location: event.location,
    startTime: event.startTime,
    endTime: event.endTime,
    lineup: event.lineup,
    userId: event.userId,
    createdBy: {
      id: event.createdBy.id,
      name: event.createdBy.name,
      image: event.createdBy.image,
    },
    categoryIds: categoryIds,
  };

  return formatedEvent;
  // return {
  //   ...event,
  //   categoryIds,
  //   categories: undefined,
  // };
};

export default getEventById;
