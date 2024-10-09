'use client'
import React from 'react'
import { useBusiness } from '@/context/business';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BusinessState } from '@/utils/types/business';
import PreviewCard from '@/components/business/preview/preview-card';

interface InputField{
  name: string;
  type: string;
  label: string;
  // placeholder: string;
  required?: boolean;
  accept?: string;
}

const inputFields: InputField[]=[
{
    name: "name",
  label: "Business Name",
  type: "text",
  required: true,
}, 
{
  name: "category",
label: "Category (e.g. Construction, Cafe, etc)",
type: "text",
required: true,
},
{
  name: "address",
label: "Business Address",
type: "text",
required: true,
}, 
{
  name: "phone",
label: "Phone",
type: "tel",

}, 
{
  name: "email",
label: "Email",
type: "email",
required: true,
}, 
{
  name: "website",
label: "Website URL",
type: "url",
}, 
{
  name: "hours",
label: "Opening Hours (e.g. Mon - Fri 9am - 5pm)",
type: "text",

}, 
{
  name: "abn",
label: "Business Registration Number",
type: "number",


}, 
{
  name: "logo",
label: "Logo (upload square image)",
type: "file",
accept: 'image/*',
}

]
export default function AddBusinessPage() {
  const {business, handleChange, handleSubmit} = useBusiness();
  
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className='flex flex-col lg:w-1/2 p-4 lg:order-last lg:flex lg:justify-center lg:items-center overflow-y-auto min-h-[354px]'>
      <PreviewCard business={business} />
      </div>
      
      <div className='flex flex-col lg:w-1/2 p-4 lg:order-first lg:flex lg:items-start overflow-y-auto'>
      
         <div>List your business for free</div>
          {inputFields.map((item,index)=>(
              <div key={index} className="my-2 w-full">
               <label className="text-xs" htmlFor={item.name}>{item.label}</label>
               <Input name={item.name}  
                 type={item.type}
                 required={item.required}
                 onChange={handleChange}
                 value={(business[item.name as keyof BusinessState] || '') as
                  | string
                  | number
                 }
                 />
        </div>
      ))}
      <Button type="submit" className="my-5" onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  )
}
