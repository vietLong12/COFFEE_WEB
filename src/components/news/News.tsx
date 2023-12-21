import React from "react";
import Heading from "../common/Heading";
import NewItem from "./newsItem/NewItem";

const News = () => {
  return (
    <div className="bg-blur mt-20 pt-24 pb-40">
      <div className="font-bold tracking-tighter"><Heading title="Tin tức mới nhất" href="/tin-tuc"/></div>
      <div className="grid grid-cols-2 gap-4 xl:w-3/5 w-full mx-auto mt-16 xl:p-0 px-8">
        <NewItem />
        <NewItem />
        <NewItem />
        <NewItem />
      </div>
    </div>
  );
};

export default News;
