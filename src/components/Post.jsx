/* eslint-disable @next/next/no-img-element */
import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";

const Post = ({ post }) => {
  return (
    <>
      <div className="bg-white my-7 border rounded-md">
        <div className="flex items-center p-5 border-b border-gray-100">
          <img
            src={post.profileImg}
            alt="profile"
            className="h-12 w-12 object-cover border p-1 m-3 rounded-full"
          />
          <h2 className="flex-1 font-bold ">{post.username}</h2>
          <HiOutlineDotsVertical className="h-5 cursor-pointer" />
        </div>
        <img src={post.image} alt="post" className="object-cover w-full" />

        <p className="p-5 truncate">
          <span className="font-bold mr-2">{post.username}</span> {post.caption}
        </p>
      </div>
    </>
  );
};

export default Post;
