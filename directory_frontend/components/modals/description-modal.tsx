'use client'
import React from 'react'
import { Copy } from "lucide-react"
import { Loader2Icon,Send, Brain } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  
} from "@/components/ui/dialog"
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(()=> import('react-quill'), {ssr: false});
import 'react-quill/dist/quill.snow.css';

import { useBusiness } from '@/context/business'


export default function DescriptionModal() {
  const {openDescriptionModal, setOpenDescriptionModal, business, setBusiness, generateBusinessDescription, generateDescriptionLoading} = useBusiness();
  return (
    <Dialog open={openDescriptionModal} onOpenChange={setOpenDescriptionModal}>
  
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Business Description</DialogTitle>
          <DialogDescription>
            Make changes to your business description here. Click close when you are done
          </DialogDescription>
        </DialogHeader>
       
          <div className="grid gap-4 py-4">
            <ReactQuill
            theme="snow"
            onChange={e => setBusiness({...business, description: e})}
            value={business.description || ""}
            />
           </div>
        
        <DialogFooter className="sm:justify-start">
          
          <div className='flex justify-between items-cener w-full'>
      <Button  variant="destructive" type="submit" disabled={
          !business?.name || !business?.category || generateDescriptionLoading}
       className="my-5" onClick={generateBusinessDescription}>      {generateDescriptionLoading ? <Brain className='animate-spin mr-2'/> : <Send className='mr-2'/>}{" "}Generate Description with AI</Button>
           </div>
           <Button type="submit"
           className='my-5' onClick={()=> setOpenDescriptionModal(false)} disabled={
              !business?.name || !business?.category || !business?.address || generateDescriptionLoading
           }>
            Close
           </Button>
          
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}




