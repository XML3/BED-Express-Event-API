import axios from "axios";
import fs from "fs";

const uploadFileToImgBB = async (filePath) => {
  try {
    const imageBuffer = fs.readFileSync(filePath);
    const imageBase64 = imageBuffer.toString("base64");

    const imgbbResponse = await axios.post("https://api.imgbb.com/1/upload", {
      key: process.env.IMGBB_API_KEY,
      image: imageBase64,
    });

    //Remove file from local uploads after actual upload to image host
    fs.unlinkSync(filePath);
    console.log(
      "Image uploaded to ImgBB successfully:",
      imgbbResponse.data.data.url
    );

    return imgbbResponse.data.data.url;
  } catch (error) {
    console.error("Error uploading file to ImgBB:", error);
    // clean up file if upload fails as well
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw error;
  }
};

export default uploadFileToImgBB;

//This Util is set up in order to send an uploaded image from a devide to the photohosting site.
//In the FED this is located in the Forms to Create or Update Events
