import React, { useContext, useEffect, useRef, useState } from "react";
import SubHeader from "../components/subHeader/SubHeader";
import io from "socket.io-client";
import { AuthContext } from "../context/authContext";
import { BASE_URL } from "../service/type";
import Swal from "sweetalert2";
import { randomString } from "../utilities";
import Peer from "simple-peer";
interface DataUserCommentSocket {
  author: string;
  content: string;
  time: string;
}

// @ts-ignore
const socket = io.connect("http://172.16.0.2:5500");
const LiveStream = () => {
  const auth = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [viewCount, setViewCount] = useState(0);
  const [text, setText] = useState("");
  const [stream, setStream] = useState(null);
  const [peer, setPeer] = useState(null);

  const videoRef = useRef(null);
  console.log("videoRef: ", videoRef);
  const guest = useRef("GUEST_" + randomString(4));
  const commentContainerRef = useRef(null);

  let username = auth?.userData?.username;
  const joinLive = async () => {
    socket.emit("joinLive");
  };

  const sendCommentSocket = (data: DataUserCommentSocket) => {
    socket.emit("sendComment", data);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendComment();
    }
  };
  const handleSendComment = () => {
    if (text.length > 0) {
      if (auth?.isLoggedIn) {
        const comment = {
          author: username ? username : "GUEST",
          content: text,
          time: new Date().toLocaleString(),
        };
        console.log(comment);
        setText("");
        sendCommentSocket(comment);
      } else {
        const comment = {
          author: guest.current,
          content: text,
          time: new Date().toLocaleString(),
        };
        console.log(comment);
        sendCommentSocket(comment);
        setText("");
      }
    } else {
      Swal.fire({ title: "Hãy viết gì đó", icon: "warning" });
    }
  };

  useEffect(() => {
    joinLive();
    socket.on("viewCount", (data) => {
      setViewCount(data);
    });
    socket.on("listComment", (data) => {
      setComments(data);
    });

    socket.on("live", (data) => {
      console.log("Co tin hieu");
      const peer = new Peer({ initiator: false });
      console.log("peer: ", peer);

      peer.signal(data);
      peer.on("stream", (stream) => {
        videoRef.current.srcObject = stream;
      });
      videoRef.current.play();

      setPeer(peer);
    });
  }, [socket]);
  useEffect(() => {
    // Cuộn đến cuối cùng của phần tử chứa các bình luận sau mỗi lần thêm bình luận mới
    if (commentContainerRef.current) {
      commentContainerRef.current.scrollTop =
        commentContainerRef.current.scrollHeight;
    }
  }, [comments]);

  return (
    <>
      <SubHeader heading="Live Stream" />
      <div className="w-4/5 mx-auto py-10 pb-40">
        <div className="lg:grid grid-cols-4 gap-4">
          <div className="col-span-3">
            <video
              controls
              autoPlay
              playsInline
              className="w-full"
              ref={videoRef}
            ></video>
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
              className="p-4 pt-2 mt-4 overflow-y-scroll border border-primary rounded xl:h-500 h-200"
              ref={commentContainerRef}
            >
              {comments.map((comment: any, index) => {
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
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                  onKeyUp={handleKeyPress}
                />
                <button
                  className="bg-primary text-white rounded hover:text-primary hover:bg-white border border-primary duration-200"
                  onClick={handleSendComment}
                >
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
