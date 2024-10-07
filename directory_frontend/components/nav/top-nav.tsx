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
import ModeToggle from './mode-toggle';
import  Image  from 'next/image';
import Link from 'next/link';


export default function TopNav() {
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
              Dashboard
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>task 1</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>task 2</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <ModeToggle/>
        </MenubarMenu>
    </div>
    
  </Menubar>)
}
