# Express Events API - ORM - Node.js/Express, Prisma
This is the back-end Express API for the Events Management system, serving as the backbone of the full-stack application. It provides a robust API for managing event data, user communication, and image hosting functionalities.

![Rental_hub](https://github.com/user-attachments/assets/e4591d9b-93e6-419d-8071-4d67b888abe9)


## Project Overview
This project is built with Node.js and Express to handle all server-side logic, and it utilizes Prisma ORM for interacting with a PostgreSQL database. The API manages the following key features:

Event Management: Allows event creators to post, edit, and delete events through token-based authorization.

Contact Form Functionality: Facilitates communication between users and event managers through email using Nodemailer.

Image Hosting: Enables event organizers to upload images urls for their events, from an external image hosting site.

Full-Stack Integration: Works seamlessly with the front-end React.js solution, providing a comprehensive event management system. Front-End Repository.

## Key Features
CRUD Operations for Events:

Create, Read, Update, and Delete events via an authenticated API.

Events include details like title, date, time, description, location, and image URLs.

User Authentication:

Secure endpoints requiring token-based authentication for event creators to manage their events.

Contact Form:

A feature for users to send messages to the app manager directly from the front-end, with email notifications handled via Nodemailer.

Image Upload:

Event creators can upload event-related images that are stored and hosted on an image hosting service.

Database Management:

The project uses Prisma ORM to manage interactions with the PostgreSQL database.

Branches in This Repository
This repository contains multiple branches to accommodate various changes made to the database host:

main: Contains the current version of the API built for PostgreSQL.

Events-API: An earlier version that used MySQL as the database before switching to PostgreSQL. This branch was modified to reflect changes made due to the migration to a new hosting service.

Features Disabled in Portfolio Deployment
For the purpose of portfolio demonstration and to avoid spamming, some features of this project have been disabled in the deployed version, including:

Deletion functionality.

Contact form submissions.

However, you can still explore the project as a current user, allowing you to view event data without any modifications.

## Getting Started
To run the API locally, follow the steps below:

Prerequisites
Node.js and npm installed on your machine.

A PostgreSQL database (can be set up locally or use a hosted database).

Installation
Clone the repository to your local machine

bash
git clone [repo]
Navigate to the project directory:

bash
cd express-events-api
Install the required dependencies

bash
npm install
Create a .env file to store environment variables, including the PostgreSQL connection string, example: 

DATABASE_URL=your_database_url

Set up Prisma by running the following command to generate the database schema:

bash
npx prisma migrate dev
Start the server:

bash
npm start
The API will be available at http://localhost:5000 by default.

Folder Structure
src/: Main folder containing the application code.

controllers/: Contains the route handler files for different resources (events, users, etc.).

models/: Contains Prisma model definitions for database entities.

services/: Contains business logic and service-related code (e.g., sending emails with Nodemailer).

routes/: Defines the routes for API endpoints (CRUD operations for events, user authentication, contact form, etc.).

middlewares/: Contains middleware for authentication and error handling.

prisma/: Contains Prisma schema and database migration files.

.env: Environment variables used for sensitive data such as database credentials and email settings.

Example of how the routes are organized:

### Example of how the routes are organized:

```js
// routes/events.js
const express = require('express');
const { createEvent, getEvents, updateEvent, deleteEvent } = require('../controllers/eventController');
const router = express.Router();

router.post('/create', createEvent);
router.get('/', getEvents);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
```
server.js: The entry point of the application, where the Express server is set up and routes are linked.

API Endpoints
POST /events/create: Create a new event (authentication required).

GET /events: Retrieve all events.

PUT /events/:id: Update an existing event (authentication required).

DELETE /events/:id: Delete an event (authentication required).

POST /contact: Send a message through the contact form (Nodemailer).

Usage
Once the server is up and running, you can interact with the API using tools like Postman or cURL. All event-related functionality requires authentication via a token, which can be retrieved upon user login.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Copyright Notice: All design elements, visuals, and intellectual property related to this API are protected by copyright and cannot be copied, reproduced, or used without the express permission of the author.


