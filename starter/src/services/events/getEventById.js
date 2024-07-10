import prisma from "../../../lib/prismaClient.js";

const getEventById = async (id) => {
  const event = await prisma.event.findUnique({
    where: {
      id,
    },
    include: {
      users: {
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
  const createdBy = event.users.map((user) => user.id);
  return {
    ...event,
    categoryIds,
    categories: undefined,
    createdBy,
    users: undefined,
  };
};

export default getEventById;
