import React, { useContext, useEffect, useState } from "react";
import SubHeader from "../components/subHeader/SubHeader";
import io from "socket.io-client";
import { AuthContext } from "../context/authContext";
const socket = io.connect("http://localhost:5500");
const LiveStream = () => {
  const auth = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [viewCount, setViewCount] = useState(0);
  console.log("viewCount: ", viewCount);
  console.log("comments: ", comments);

  const joinLive = async () => {
    const username = await auth?.userData?.username;
    console.log("username: ", username);
    socket.emit("joinLive", username);
  };

  useEffect(() => {
    joinLive();
    socket.on("viewCount", (data) => {
      setViewCount(data);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <>
      <SubHeader heading="Live Stream" />
      <button onClick={joinLive}>AAA</button>
      <div className="w-4/5 mx-auto py-10 pb-40">
        <div className="lg:grid grid-cols-4 gap-4">
          <div className="col-span-3">
            <video controls className="w-full">
              <source
                src="https://www.w3schools.com/html/movie.mp4/"
                type="video/mp4"
              />
            </video>
            <h1 className="text-3xl font-bold pt-4 line-clamp-1">
              Buổi bán hàng của Monster ngày 31 tháng 1 năm 2024
            </h1>
            <p>Số lượng người xem: {viewCount}</p>
          </div>
          <div className="">
            <h1 className="uppercase font-bold text-center text-2xl underline pt-4">
              Bình luận hàng đầu
            </h1>
            <div
              className="p-4 pt-2 mt-4 overflow-y-scroll border border-primary rounded lg:h-96 h-40"
              style={{ height: "500px" }}
            >
              {comments.map((comment, index) => {
                return (
                  <div className="flex flex-row mb-2 mt-1" key={index}>
                    <p>
                      <span className="font-bold">{comment.author}</span>:{" "}
                      {comment.content}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="mt-2">
              <div className="grid grid-cols-5 gap-2">
                <input
                  type="text"
                  className="bg-white rounded border border-primary py-2 px-4 w-full col-span-4 outline-none"
                  name=""
                  placeholder="Để lại bình luận của bạn..."
                  id=""
                />
                <button className="bg-primary text-white rounded hover:text-primary hover:bg-white border border-primary duration-200">
                  Gửi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveStream;
