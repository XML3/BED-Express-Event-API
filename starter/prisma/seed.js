import { PrismaClient } from "@prisma/client";
import userData from "../src/data/users.json" assert { type: "json" };
import categoryData from "../src/data/categories.json" assert { type: "json" };
import eventData from "../src/data/events.json" assert { type: "json" };
import articleData from "../src/data/articles.json" assert { type: "json" };
import imgAnimationData from "../src/data/imgAnimation.json" assert { type: "json" };

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
  const { users } = userData;
  const { categories } = categoryData;
  const { events } = eventData;
  const { articles } = articleData;
  const { imgAnimation } = imgAnimationData;

  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }

  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: {},
      create: category,
    });
  }

  for (const event of events) {
    await prisma.event.upsert({
      where: { id: event.id },
      update: {},
      create: {
        id: event.id,
        title: event.title,
        description: event.description,
        startTime: event.startTime,
        endTime: event.endTime,
        location: event.location,
        image: event.image,
        lineup: event.lineup,
        categories: {
          connect: event.categoryIds.map((id) => ({ id })),
        },
        createdBy: {
          connect: { id: event.createdBy },
        },
      },
    });
  }

  for (const article of articles) {
    await prisma.articles.upsert({
      where: { id: article.id },
      update: {},
      create: article,
    });
  }

  for (const imgAnimate of imgAnimation) {
    await prisma.imgAnimation.upsert({
      where: { id: imgAnimate.id },
      update: {},
      create: imgAnimate,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
