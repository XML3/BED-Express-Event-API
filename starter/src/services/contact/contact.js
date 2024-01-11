import { PrismaClient } from "@prisma/client";
import { sendMail } from "../../utils/sendMail";

const createContactEntry = async (name, email, message) => {
  const prisma = new PrismaClient();
  try {
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        message,
      },
    });

    //Mail Option object example
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: "New Form Submission",
      text: "You have a new form submission.  Check your database for details",
    };

    await sendMail(mailOptions);

    return contact;
  } finally {
    await prisma.$disconnect();
  }
};

export default createContactEntry;
