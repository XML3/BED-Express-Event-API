// import eventData from "../../data/events.json" assert { type: "json" };

// const getEvents = (title, location) => {
//   let events = eventData.events;

//   if (title) {
//     events = events.filter((event) => !event.title || event.title === title);
//   }

//   if (location) {
//     events = events.filter(
//       (event) => !event.location || event.location === location
//     );
//   }
//   return events;
// };

import { PrismaClient } from "@prisma/client";

const getEvents = async (title, location) => {
  const prisma = new PrismaClient();
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
