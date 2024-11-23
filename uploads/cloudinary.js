// cloudinary.js
import { config } from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import path from 'path';

config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function getFolder(folder){
    if (folder === "event"){
        return "Event folder"
    }else{
        return "Testimonial folder"
    };
};
function GetFileName(file){
  const pathName = path.extname(file.name)
  const name = file.name.replace(pathName,"").trim();
  return name;
}

const uploadImage = async (file,folder) => {
    const name = GetFileName(file);
    try {
      const name = file.name.split('.')[0]
      const document = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: getFolder(folder) ,
        public_id:name,
      },(result) => result);
      return document;
    } catch (error) {
      // throw new Error(error.message);
      console.log(error.message)
    }
  };

export default uploadImage;
