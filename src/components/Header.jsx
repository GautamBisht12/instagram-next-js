/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, useSession, signOut } from "next-auth/react";
import Modal from "react-modal";
import { IoIosAddCircleOutline } from "react-icons/io";
import { HiCamera } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/firebase";

const Header = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);

  const filePickerRef = useRef(null);

  const addImageToPost = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImageFileUrl(URL.createObjectURL(file));
      console.log(selectedFile);
      console.log(imageFileUrl);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      uploadFileToStorage();
    }
  }, [selectedFile]);

  const uploadFileToStorage = async () => {
    setImageFileUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + selectedFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error(error);
        setImageFileUploading(false);
        setImageFileUrl(null);
        setSelectedFile(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setImageFileUploading(false);
        });
      }
    );
  };

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
            {selectedFile ? (
              <img
                onClick={() => setSelectedFile(null)}
                src={imageFileUrl}
                alt="selected file"
                className={`w-full max-h-[250px] object-cover cursor-pointer  ${
                  imageFileUploading ? "animate-pulse" : ""
                }`}
              />
            ) : (
              <HiCamera
                onClick={() => filePickerRef.current.click()}
                className="text-5xl cursor-pointer text-gray-400"
              />
            )}
            <input
              hidden
              ref={filePickerRef}
              type="file"
              accept="image/*"
              onChange={addImageToPost}
            />
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
