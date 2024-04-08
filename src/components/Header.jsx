/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, useSession, signOut } from "next-auth/react";
import Modal from "react-modal";
import { IoIosAddCircleOutline } from "react-icons/io";
import { HiCamera } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

const Header = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

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
            <div className="flex items-center gap-2">
              <IoIosAddCircleOutline
                className="cursor-pointer hover:text-red-500 hover:scale-125 transform transition duration-300 "
                size={26}
                onClick={() => setIsOpen(true)}
              />
              <img
                onClick={signOut}
                className="w-10 rounded-full cursor-pointer"
                src={session?.user?.image}
                alt={session.user.name}
              ></img>
            </div>
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
      {isOpen && (
        <Modal
          isOpen={isOpen}
          className="max-w-lg w-[90%] flex flex-col flex-items items-center justify-center  absolute top-56 left-[50%] translate-x-[-50%]  bg-white p-6 border-2 rounded-md shadow-md  "
          onRequestClose={() => setIsOpen(false)}
          ariaHideApp={false}
        >
          <div className="flex flex-col justify-center items-center h-[100%] ">
            <HiCamera className="text-5xl cursor-pointer text-gray-400" />
          </div>
          <input
            type="text"
            maxLength="150"
            placeholder="Please enter your caption ...."
            className="w-full text-center border-none outline-none m-4 focus:ring-0"
          />
          <button
            disabled
            className="w-full bg-red-600 text-white p-2 shadow-md rounded-lg hover:brightness-105 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:brightness-100"
          >
            Upload Post
          </button>
          <AiOutlineClose
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 cursor-pointer  hover:text-red-600 transition duration-300"
          />
        </Modal>
      )}
    </>
  );
};

export default Header;
