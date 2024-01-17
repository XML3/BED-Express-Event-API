import multer from "multer";

const upload = multer({ dest: "uploads/" });

export default upload;

//This Middleware is set to work in the Routers of Events Create and Update.
//It it related to the uploading of user's image from a device on to a hosting photo site
