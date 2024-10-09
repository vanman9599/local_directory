import React from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import ModeToggle from './mode-toggle';
import  Image  from 'next/image';
import Link from 'next/link';
import { LayoutDashboard, Plus, LogIn, Layout } from 'lucide-react';
import { currentUser } from '@clerk/nextjs/server';
import { Toaster } from 'react-hot-toast';

export default async function TopNav() {
  const user = await currentUser();
  console.log(user);
  return (<Menubar>
    <div className="flex-none">
      <MenubarMenu>
        <Link href="/">
           <Image src="/logoipsum-225.svg" alt="logo" width={50} height={50} className="hover-cursor-pointer"/>
        </Link>
       
        </MenubarMenu>
    </div>

    <div className="flex flex-grow items-center justify-end gap-1">
    <MenubarMenu>
          <MenubarTrigger className="text-base font-normal">
              <Link href="/business/add"><span className="flex items-center"><Plus className='mr-2' size={16} /><span>Add Business</span></span></Link>
          </MenubarTrigger>
        </MenubarMenu>
        {user && (
          <MenubarMenu>
          <MenubarTrigger className="text-base font-normal">
              <Link href="/dashboard">
              <span className='flex items-center'>
                
                  <LayoutDashboard size={16} className='mr-2' />
                 <span> Dashboard</span>
                </span></Link>
          </MenubarTrigger>
        </MenubarMenu>
        )}
        
        
        
        
        <SignedOut>
          <span className='flex items-center'>
            <LogIn size={16} className='mr-2'/>
             <SignInButton />
          </span>
         
        </SignedOut>

        <SignedIn>
          <UserButton/>
        </SignedIn>
        <MenubarMenu>
          <ModeToggle/>
        </MenubarMenu>
    </div>
    <Toaster/>
  </Menubar>)
}
