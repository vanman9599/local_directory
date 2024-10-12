'use server'
import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

//handle image upload action
export const handleLogoAction = async(base64Image: String)=>{
  try{
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: "ai-local-directory",
      transformation:[
        {width: 300, height: 300, crop: 'limit'}
      ]
    })
    return result.secure_url;
  }catch(err){
    console.log(err);
    return null;

  }
}