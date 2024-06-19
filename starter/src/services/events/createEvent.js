// import eventData from "../../data/events.json" assert { type: "json" };
// import { v4 as uuid } from "uuid";

// const createEvent = (
//   title,
//   description,
//   location,
//   image,
//   startTime,
//   endTime,
//   createdBy,
//   categoryIds,
//   lineup
// ) => {
//   const newEvent = {
//     id: uuid(),
//     title,
//     description,
//     location,
//     image,
//     startTime,
//     endTime,
//     createdBy,
//     categoryIds,
//     lineup,
//   };

//   eventData.events.push(newEvent);

//   return newEvent;
// };

import { PrismaClient } from "@prisma/client";
import uploadFileToImgBB from "../../utils/fileUpload.js";

const createEvent = async (
  title,
  description,
  location,
  image,
  startTime,
  endTime,
  createdBy,
  categoryIds
) => {
  const prisma = new PrismaClient();

  //upload the image and get the ImgBB URL
  const imageUrl = await uploadFileToImgBB(image);

  const event = await prisma.event.create({
    data: {
      title,
      description,
      location,
      image: imageUrl,
      startTime,
      endTime,
      createdBy: {
        connect: { id: createdBy },
      },
      categories: {
        connect: categoryIds.map((id) => ({ id })),
      },
    },
  });

  return event;
};
export default createEvent;
