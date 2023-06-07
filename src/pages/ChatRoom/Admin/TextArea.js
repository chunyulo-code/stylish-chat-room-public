import React, { useState, useEffect, useContext } from "react";
import { ChatAdminContext } from "../../../context/chatAdminContext";
import { AuthContext } from "../../../context/authContext";
import io from "socket.io-client";

const SERVER = "wss://ctceth.com:8080";
const socket = io.connect(SERVER);

export default function TextArea({ setChatHistory, scrollToBottom }) {
  const [incomingMsg, setIncomingMsg] = useState("");
  const { currentRoomId, updateSidebar } = useContext(ChatAdminContext);
  const { adminId } = useContext(AuthContext);

  const sendHandler = (e) => {
    e.preventDefault();
    if (!incomingMsg) return;
    const data = {
      message: incomingMsg,
      sender_id: adminId,
      time_stamp: Date.now(),
      chat_room_id: currentRoomId,
      picture: window.localStorage.getItem("userPicture")
    };
    socket.emit("chat message", data, currentRoomId);
    setChatHistory((prev) => [...prev, data]);
    setIncomingMsg("");
  };

  const joinHandler = (room_id) => {
    socket.emit("join room", room_id);
  };

  useEffect(() => {
    socket.on("chat message", (data) => {
      updateSidebar();
      if (data.chat_room_id !== currentRoomId) return;
      setChatHistory((prev) => [...prev, data]);
    });
  }, []);

  socket.emit("admin connect", adminId);
  joinHandler(currentRoomId);

  return (
    <form
      className="absolute bottom-5 mt-[60px] flex w-[calc(100%-80px)]"
      onSubmit={sendHandler}
    >
      <input
        type="text"
        className="w-full rounded-lg border border-solid border-chatroom-gray px-2 py-2"
        placeholder="請輸入訊息"
        value={incomingMsg}
        onChange={(e) => setIncomingMsg(e.target.value)}
      />
      <button className="ml-[20px] h-[40px] w-[100px] rounded-lg bg-chatroom-light-gray">
        送出
      </button>
    </form>
  );
}
