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
  });

  return events;
};

export default getEvents;
