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
  console.log("Creating event with data:", {
    title,
    description,
    location,
    image,
    startTime,
    endTime,
    lineup,
    createdBy,
    categoryIds,
  });

  // const userExists = await prisma.user.findUnique({
  //   where: { id: createdBy },
  // });
  // if (!userExists) {
  //   throw new Error(`User with id ${createdBy} does not exist`);
  // }
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
