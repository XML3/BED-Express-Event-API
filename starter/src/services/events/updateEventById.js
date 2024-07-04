import prisma from "../../../lib/prismaClient.js";
import uploadFileToImgBB from "../../utils/fileUpload.js";

const updateEventById = async (id, updatedEvent) => {
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
