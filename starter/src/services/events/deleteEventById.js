// import eventData from "../../data/events.json" assert { type: "json" };

// const deleteEvent = (id) => {
//   const eventIndex = eventData.events.findIndex(
//     (event) => event.id === Number(id)
//   );

//   if (eventIndex === -1) {
//     return null;
//   }

//   eventData.events.splice(eventIndex, 1);
//   return Number(id);
// };

import { PrismaClient } from "@prisma/client";

const deleteEvent = async (id) => {
  const prisma = new PrismaClient();
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
