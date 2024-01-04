// import eventData from "../../data/events.json" assert { type: "json" };

// const getEventById = (id) => {
//   return eventData.events.find((event) => event.id === Number(id));
// };

import { PrismaClient } from "@prisma/client";

const getEventById = async (id) => {
  const prisma = new PrismaClient();
  const event = await prisma.event.findUnique({
    where: {
      id,
    },
  });

  return event;
};

export default getEventById;
