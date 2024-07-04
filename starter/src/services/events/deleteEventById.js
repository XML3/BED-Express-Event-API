import prisma from "../../../lib/prismaClient.js";

const deleteEvent = async (id) => {
  const event = prisma.event.deleteMany({
    where: { id },
  });

  if (event.count > 0) {
    return id;
  } else {
    return null;
  }
};
export default deleteEvent;
