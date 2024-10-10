'use client';
import React, {createContext,useEffect, useContext, useState, ReactNode} from 'react';
import {useClerk, useUser} from '@clerk/nextjs'
import { saveBusinessToDB, getBusinessFromDB, getUserBusinessesFromDB } from '@/actions/business';
import toast from 'react-hot-toast';
import { useRouter, usePathname, useParams } from 'next/navigation';


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
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  setBusinesses: React.Dispatch<React.SetStateAction<BusinessState[]>>;
  businesses: BusinessState[];
  initialState: BusinessState;

}
const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export const BusinessProvider: React.FC<{children: ReactNode}> = ({children}) => {
 
const pathname = usePathname();
const [business, setBusiness] = useState<BusinessState>(initialState);
const [loading, setLoading]= useState<boolean>(false);
const [businesses, setBusinesses] = useState<BusinessState[]>([]);
const isDashboard = pathname === "/dashboard";
const {openSignIn} = useClerk();
const {isSignedIn} = useUser();
const router = useRouter();
const { _id } = useParams();

useEffect(()=>{
  const savedBusiness = localStorage.getItem("business");
  if(savedBusiness){
    setBusiness(JSON.parse(savedBusiness))
  }
},[])

useEffect(()=>{
  if(isDashboard){
    getUserBusinesses();
  }
},[isDashboard]) 

useEffect(()=>{ 
  if(_id) {
    getBusiness()
  }
},[_id])

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

 const getUserBusinesses = async()=>{
  setLoading(true);
  try{
    const businesses = await getUserBusinessesFromDB();
    setBusinesses(businesses)
    return businesses;
  }catch(err){
    console.error(err)
    setLoading(false)
  }
}
const getBusiness = async ()=>{
   try{
    const business = await getBusinessFromDB(_id.toString());
    setBusiness(business)
   }catch(err:any){
    console.error(err);
    toast.error("Failed to fetch business")
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
      setBusinesses,
      businesses, 
      initialState,
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