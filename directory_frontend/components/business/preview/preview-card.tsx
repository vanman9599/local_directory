'use-client'
import React from 'react'
import { BusinessState } from '@/utils/types/business';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {MapPin, Phone, Mail, Globe, Clock} from 'lucide-react';
import Image from 'next/image';
import { useBusiness } from '@/context/business';
import DescriptonModal from '@/components/modals/description-modal';


export default function PreviewCard({business}: {business: BusinessState}) {
  const { openDescriptionModal,
     setOpenDescriptionModal,
      isDashboard, 
    togglePulished } = useBusiness();
  return( 
  <Card className="w-full max-w-2xl mx-auto" style={{height: '354px'}}>
    <CardHeader className="flex flex-row items-center space-x-4 pd-2">
        <div className="w-16 h-16 relative overflow-hidden rounded-md">
          {business?.logo ? (
            <Image
              src={business.logo}
              alt={business.name}
              layout="fill"
              objectFit="cover"
              />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500 text-xs">No logo</span>
            </div>
          )}
        </div>
        <div className='flex-1 min-w-0'>
          <CardTitle className="text-lg line-clamp-1">{business.name}</CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-1">{business?.category || 'Category'}</p>

        </div>
    </CardHeader>
    <CardContent>
      <div className="cursor-pointer text-sm mb-4 line-clamp-3" onClick={()=> !isDashboard && setOpenDescriptionModal(!openDescriptionModal)}>
        {business?.description ? <div dangerouslySetInnerHTML={{__html: business.description}} /> : "AI powered description goes here"} 
      </div>
      <div className="space-y-2">
        <InfoItem icon={MapPin} text={business?.address || "Address"} />
        <InfoItem icon={Phone} text={business?.phone || "Phone"} />
        <InfoItem icon={Mail} text={business?.email || "Email"} />
        <InfoItem icon={Globe} text={business?.website || "Website"} />
        <InfoItem icon={Clock} text={business?.hours || "Hours"} />
      </div>
    </CardContent>
    <DescriptonModal  />
  </Card>
  )
}
 
function InfoItem({icon: Icon,text}: {icon: any, text: string}){
  return(
    <div className="flex items-center text-sm">
      <Icon className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0"/>
      <span className="line-clamp-1">{text}</span>
    </div>
  )
}