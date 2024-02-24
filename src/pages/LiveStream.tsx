import React, { useContext, useEffect, useRef, useState } from "react";
import SubHeader from "../components/subHeader/SubHeader";
import io from "socket.io-client";
import { AuthContext } from "../context/authContext";
import { BASE_URL } from "../service/type";
import Swal from "sweetalert2";
import { randomString } from "../utilities";
import Peer from "simple-peer";

const socket = io.connect("http://localhost:5500");

interface DataUserCommentSocket {
  author: string;
  content: string;
  time: string;
}

const LiveStream = () => {
  const auth = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [viewCount, setViewCount] = useState(0);
  const [text, setText] = useState("");

  const videoRef = useRef(null);
  const guest = useRef("GUEST_" + randomString(4));
  let username = auth?.userData?.username;

  const joinLive = () => {
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
      const comment = {
        author: username ? username : "GUEST",
        content: text,
        time: new Date().toLocaleString(),
      };

      setText("");
      sendCommentSocket(comment);
    } else {
      Swal.fire({ title: "Hãy viết gì đó", icon: "warning" });
    }
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket: ", socket);
    });

    joinLive();

    socket.on("viewCount", (data) => {
      setViewCount(data);
    });

    socket.on("listComment", (data) => {
      setComments(data);
    });

    socket.on("live", async (offerSdp) => {
      const configuration = {}; // Cấu hình ICE servers nếu cần
      const peer = new Peer({
        initiator: false,
        trickle: false,
      });

      peer.signal(offerSdp);

      peer.on("signal", (answerSdp) => {
        socket.emit("answer", answerSdp);
      });

      peer.on("stream", (stream) => {
        videoRef.current.srcObject = stream;
      });
    });
  }, []);

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
            <div className="p-4 pt-2 mt-4 overflow-y-scroll border border-primary rounded xl:h-500 h-200">
              {comments.map((comment: any, index) => (
                <div className="flex flex-row mb-2 mt-1" key={index}>
                  <p>
                    <span className="font-bold">{comment.author}</span>:{" "}
                    {comment.content}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-2">
              <div className="grid grid-cols-5 gap-2">
                <input
                  type="text"
                  className="bg-white rounded border border-primary py-2 px-4 w-full col-span-4 outline-none"
                  placeholder="Để lại bình luận của bạn..."
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
