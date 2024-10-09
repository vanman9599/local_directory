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
   
    throw new Error(err)
  }

  }
