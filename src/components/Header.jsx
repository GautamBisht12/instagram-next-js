"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, useSession, signOut } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  return (
    <>
      <div className="sticky top-0 shadow-sm border-b bg-white z-30 p-3 ">
        <div className="max-w-[75%]  mx-auto flex  justify-between items-center">
          <Link href="/">
            <Image
              className="hidden lg:inline-flex"
              width={90}
              height={90}
              src="/instagram-Logo.png"
              alt="instagram logo"
            ></Image>
            <Image
              className="lg:hidden"
              width={40}
              height={40}
              src="/instagram_PNG.png"
              alt="instagram logo"
            ></Image>
          </Link>

          <input
            type="text"
            placeholder="Search"
            className="w-full py-2 px-4 max-w-[210px] bg-gray-50 border border-gray-200 rounded text-sm"
          />

          {session ? (
            <img
              onClick={signOut}
              className="w-10 rounded-full cursor-pointer"
              src={session?.user?.image}
              alt={session.user.name}
            ></img>
          ) : (
            <button
              onClick={signIn}
              className="text-sm font-semibold text-blue-500 "
            >
              Log In
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
