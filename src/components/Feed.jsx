import React from "react";
import Posts from "./Posts";
import MiniProfile from "./MiniProfile";

const Feed = () => {
  return (
    <>
      <main className=" grid grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto p-4">
        <section className="md:col-span-2">
          <Posts />
        </section>
        <section className="  hidden md:inline-grid md:col-span-1">
          <MiniProfile className=" fixed  w-[380px] " />
        </section>
      </main>
    </>
  );
};

export default Feed;
