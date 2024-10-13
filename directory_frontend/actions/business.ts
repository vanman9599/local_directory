'use server';
import db from '@/utils/db';
import Business from '@/models/business';
import {currentUser} from '@clerk/nextjs/server';
import {BusinessState} from "@/utils/types/business"
import {nanoid} from 'nanoid';
import slugify from 'slugify';
import { Error } from 'mongoose';

export const saveBusinessToDB = async(data: BusinessState)=>{
  try{
    await db();
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress
    const {_id, ...rest} = data;
    const slug = slugify(`${rest.category}-${rest.name}-${rest.address}-${nanoid()}`)
    const business = await Business.create({...rest, slug, userEmail})
    return JSON.parse(JSON.stringify(business));
  }catch(err: any){
   
    console.error(err)
  }

  }

  export const getUserBusinessesFromDB = async()=>{
    try{
      await db();
      const user = await currentUser();
      const userEmail = user?.emailAddresses[0]?.emailAddress
      const businesses = (await Business.find({userEmail}));
      return JSON.parse(JSON.stringify(businesses));
    }catch(err: any){
      throw new Error(err)
    }
  }
  export const getBusinessFromDB = async(_id: string)=>{
    try{
      await db();
      const business = (await Business.findById(_id));
      return JSON.parse(JSON.stringify(business));
    }catch(err: any){
      throw new Error(err)
    }
  }
   export const updateBusinssInDB = async(data: BusinessState)=>{
    try{
      await db();
      const {_id, ...rest} = data;
       const business = await Business.findByIdAndUpdate(_id,rest, {new: true})
      return JSON.parse(JSON.stringify(business));
    }catch(err: any){
      throw new Error(err)
    }
   }