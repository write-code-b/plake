"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { useHydrateUserStore } from "@/hooks/useHydrateUserStore";
import useLogout from "@/hooks/useLogout";
import useUserStore from "@/stores/useUserStore";

import Avatar from "../common/Avatar";
import LoadingSpinner from "../common/LoadingSpinner";
import NavList from "../navigations/NavList";
import SideBar from "../navigations/SideBar";

const PopoverMenu = () => {
  const { user } = useUserStore();
  const { logout } = useLogout();

  return (
    <Popover>
      <PopoverTrigger className="hidden md:block">
        <Avatar type="default" size="default" imgPath={user?.image} />
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={1} className="w-28 p-0">
        <ul>
          <li className="px-4 py-2 text-sm text-gray-800 hover:text-purple-700">
            <Link href="/">마이페이지</Link>
          </li>
          <li
            className="cursor-pointer px-4 py-2 text-sm text-gray-800 hover:text-purple-700"
            onClick={logout}
          >
            로그아웃
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};

const Header = () => {
  const isHydrating = useHydrateUserStore();
  const { isLoggedIn } = useUserStore();

  return (
    <header className="fixed left-0 top-0 z-50 flex h-[60px] w-full items-center justify-center bg-white md:justify-start">
      <SideBar />
      <div className="base-wrap flex justify-between">
        <div className="flex items-center">
          <Link href="/" className="md:mr-16">
            <Image
              src="/images/logo.png"
              alt="logo-image"
              width={70}
              height={15}
            />
          </Link>
          <div className="hidden md:flex">
            <NavList />
          </div>
        </div>
        {isHydrating ? (
          <div className="flex h-10 w-10 items-center justify-center">
            <LoadingSpinner size="sm" />
          </div>
        ) : isLoggedIn ? (
          <PopoverMenu />
        ) : (
          <Link
            href="/login"
            className="hidden text-sm text-gray-700 hover:text-purple-600 md:block"
          >
            로그인
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
