'use server'
const {
  GoogleGenerativeAI,
  } = require("@google/generative-ai");
import { BusinessState } from "@/utils/types/business";



const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);



export const aiGenerateBusinessDescription = async (business: BusinessState): Promise<string> => {
  try{
    const prompt = `Generate 200 words of SEO content in HTML format with (with h1,h2, ul, li, not including <doctype html>) etc, not markdown, for this business: ${JSON.stringify(business)}`
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });
    const result = await model.generateContent(prompt)
    const response = await result.response;
    const text = response.text();
    return text;
  }catch(err){
    console.error(err);
    throw new Error( "Failed to generate description");
  }

}