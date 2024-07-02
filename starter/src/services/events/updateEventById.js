// import eventData from "../../data/events.json" assert { type: "json" };

// //updatedEvent paramenter to be passed as object
// const updateEventById = (id, updateEvent) => {
//   const eventIndex = eventData.events.findIndex(
//     (event) => event.id === Number(id)
//   );

//   if (eventIndex === -1) {
//     return null;
//   }

//   //pass it as object
//   const {
//     title,
//     description,
//     location,
//     image,
//     startTime,
//     endTime,
//     createdBy,
//     categoryIds,
//     lineup,
//   } = updateEvent;

//   eventData.events[eventIndex] = {
//     ...eventData.events[eventIndex],
//     title: title || eventData.events[eventIndex].title,
//     description: description || eventData.events[eventIndex].description,
//     location: location || eventData.events[eventIndex].location,
//     image: image || eventData.events[eventIndex].image,
//     startTime: startTime || eventData.events[eventIndex].startTime,
//     endTime: endTime || eventData.events[eventIndex].endTime,
//     createdBy: createdBy || eventData.events[eventIndex].createdBy,
//     categoryIds: categoryIds || eventData.events[eventIndex].categoryIds,
//     lineup: lineup || eventData.events[eventIndex].lineup,
//   };

//   return eventData.events[eventIndex];
// };

import { PrismaClient } from "@prisma/client";
import uploadFileToImgBB from "../../utils/fileUpload.js";

const updateEventById = async (id, updatedEvent) => {
  const prisma = new PrismaClient();

  const { image, categoryIds, createdBy, ...rest } = updatedEvent;

  //if there is a new image, upload it and get the ImgBB URL
  const imageUrl = image ? await uploadFileToImgBB(image) : undefined;

  const event = await prisma.event.update({
    where: { id },
    data: {
      ...rest,
      image: imageUrl || undefined,
      createdBy: createdBy
        ? {
            connect: { id: createdBy },
          }
        : undefined,
      categories: categoryIds
        ? {
            set: categoryIds.map((id) => ({ id })),
          }
        : undefined,
    },
  });

  return event;
};

export default updateEventById;
