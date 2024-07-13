import prisma from "../../../lib/prismaClient.js";
// import uploadFileToImgBB from "../../utils/fileUpload.js";

const createEvent = async ({
  title,
  description,
  location,
  image,
  startTime,
  endTime,
  lineup,
  createdBy,
  categoryIds,
}) => {
  const event = await prisma.event.create({
    data: {
      title,
      description,
      location,
      image,
      startTime,
      endTime,
      lineup,
      createdBy: {
        connect: { id: createdBy },
      },
      categories: {
        connect: (categoryIds ?? []).map((id) => ({ id })),
      },
    },
  });

  return event;
};
export default createEvent;
