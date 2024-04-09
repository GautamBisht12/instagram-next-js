/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { signIn, useSession, signOut } from "next-auth/react";

const MiniProfile = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <>
      <div>
        <div className="logo flex items-center justify-around mt-14 ml-10 w-full">
          <img
            className="w-16 h-16 border p-[2px] rounded-full"
            src={session?.user?.image || "/instagram_PNG.png"}
            alt="profile-picture"
          />
          <div className="">
            <h2 className="font-bold">{session?.user?.username}</h2>
            <h2 className="text-sm text-gray-500">
              {session?.user?.email || "Welcome to instagram"}
            </h2>
          </div>
          {!session ? (
            <button
              onClick={signIn}
              className="text-sm font-semibold text-blue-500 "
            >
              Log In
            </button>
          ) : (
            <button
              onClick={signOut}
              className="text-sm font-semibold text-blue-500 "
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default MiniProfile;
