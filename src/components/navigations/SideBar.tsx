import Image from "next/image";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sheet";
import useSideBarStore from "@/stores/useSideBarStore";

import Avatar from "../common/Avatar";
import NavList from "./NavList";

const SideBar = () => {
  const { isOpen, toggleSideBar } = useSideBarStore();

  return (
    <Sheet open={isOpen}>
      <SheetTrigger onClick={toggleSideBar}>
        <RxHamburgerMenu
          size={20}
          color="black"
          className="absolute left-5 top-5 md:hidden"
        />
      </SheetTrigger>
      <SheetContent side={"left"} className="w-[200px] bg-white p-4">
        <SheetHeader>
          <SheetTitle>
            <div className="flex items-center justify-between">
              <Link href="/" onClick={toggleSideBar}>
                <Image
                  src="/images/logo.png"
                  alt="logo-image"
                  width={70}
                  height={15}
                />
              </Link>
              <Avatar type="default" size="default" imgPath="" />
            </div>
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <NavList />
      </SheetContent>
    </Sheet>
  );
};

export default SideBar;
