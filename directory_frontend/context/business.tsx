'use client';
import React, {createContext,useEffect, useContext, useState, ReactNode} from 'react';
import {useClerk, useUser} from '@clerk/nextjs'
import { saveBusinessToDB } from '@/actions/business';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface BusinessState {
  _id: string;
  userEmail: string;
    name: string;
    category: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    hours: string;
    logo: string;
    abn: string;
    slug: string;
    published?: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number
}

const initialState: BusinessState = {
  _id: "",
  userEmail: "",
    name: "",
    category: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    hours: "",
    logo: "",
    abn: "",
    slug: "",
    createdAt: "", 
    updatedAt: "",
    __v: 0
}
interface BusinessContextType{
  business: BusinessState;
  setBusiness: React.Dispatch<React.SetStateAction<BusinessState>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void
}
const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export const BusinessProvider: React.FC<{children: ReactNode}> = ({children}) => {
 
const [business, setBusiness] = useState<BusinessState>(initialState);
const [loading, setLoading]= useState<boolean>(false);
const {openSignIn} = useClerk();
const {isSignedIn} = useUser();
const router = useRouter();

useEffect(()=>{
  const savedBusiness = localStorage.getItem("business");
  if(savedBusiness){
    setBusiness(JSON.parse(savedBusiness))
  }
},[])
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
  const {name,value} = e.target;
  setBusiness((prevBusiness: BusinessState)=>{
    const updatedBusiness = {...prevBusiness, [name]: value}
    
    //save to local storage
    localStorage.setItem("business", JSON.stringify(updatedBusiness))
    return updatedBusiness
  })
}
 const handleSubmit = async (e: React.FormEvent)=>{
  e.preventDefault();
  if(!isSignedIn){
    openSignIn();
    return
  }else{
   try{
    setLoading(true);
    const savedBusiness = await saveBusinessToDB(business)
    setBusiness(savedBusiness);
    //clear local storage and notify user, redirect to edit page
    localStorage.removeItem('business');
    toast.success("Business saved successfully")
    router.push(`/dashboard/business/edit/${savedBusiness._id}`)
   }catch(err){
      console.error(err);
      toast.error("ERROR:Failed to save business to database")
   }finally{
      setLoading(false);
   }
  }
 }
return(
    <BusinessContext.Provider value={{
      business,
      setBusiness,
      loading,
      setLoading, 
      handleChange,
      handleSubmit,
      }}>
      {children}
    </BusinessContext.Provider>
  )
}

export const useBusiness = () =>{
  const context = useContext(BusinessContext);
  if(context === undefined){
    throw new Error("useBusiness must be used with BusinessProvider")
  }
  return context;
}