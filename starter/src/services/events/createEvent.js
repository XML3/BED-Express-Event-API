import prisma from "../../../lib/prismaClient.js";
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
  //upload the image and get the ImgBB URL
  const imageUrl = image ? await uploadFileToImgBB(image.path) : null;

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
