import express from "express";
import categoriesRouter from "../routes/categories.js";
import eventsRouter from "../routes/events.js";
import usersRouter from "../routes/users.js";
import loginRouter from "../routes/login.js";
import errorHandler from "../src/middleware/errorHandler.js";
import log from "../src/middleware/logMiddleware.js";
import contactRouter from "../routes/contact.js";
import articlesRouter from "../routes/articles.js";
import imgAnimationRouter from "../routes/imgAnimation.js";
import * as Sentry from "@sentry/node";
import "dotenv/config";
import pkg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import cors from "cors"; //

const { Pool } = pkg;
const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const app = express();

//Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0,
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

//Global middleware
app.use(express.json());
app.use(log);

// CORS middleware configuration
const corsOptions = {
  origin: "https://eventsmanagementapp.netlify.app",
  // origin: "http://localhost:3000 ",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

//Routes
app.use("/categories", categoriesRouter);
app.use("/events", eventsRouter);
app.use("/users", usersRouter);
app.use("/contact", contactRouter);
app.use("/articles", articlesRouter);
app.use("/imgAnimation", imgAnimationRouter);
//Login
app.use("/auth", loginRouter);

// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

export default prisma;
