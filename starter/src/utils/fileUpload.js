import axios from "axios";

const uploadFileToImgBB = async (file) => {
  try {
    const imgbbResponse = await axios.post("https://api.imgbb.com/1/upload", {
      key: process.env.IMGBB_API_KEY,
      image: file.buffer.toString("base64"),
    });

    return imgbbResponse.data.data.url;
  } catch (error) {
    console.error("Error uploading file to ImgBB:", error);
    throw error;
  }
};

export default uploadFileToImgBB;
