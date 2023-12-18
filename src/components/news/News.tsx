import React from "react";
import Heading from "../common/Heading";
import NewItem from "./newsItem/NewItem";

const News = () => {
  return (
    <div className="bg-blur mt-20 pt-24 pb-40">
      <div className="font-bold tracking-tighter"><Heading title="Tin tức mới nhất" /></div>
      <div className="grid grid-cols-2 gap-4 w-3/5 mx-auto mt-16">
        <NewItem />
        <NewItem />
        <NewItem />
        <NewItem />
      </div>
    </div>
  );
};

export default News;
