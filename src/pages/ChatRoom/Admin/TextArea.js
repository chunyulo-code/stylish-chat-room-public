import React, { useState, useEffect, useContext } from "react";
import { ChatAdminContext } from "../../../context/chatAdminContext";
import io from "socket.io-client";

const SERVER = "wss://ctceth.com:8080";
const socket = io.connect(SERVER);

export default function TextArea({ setChatHistory, scrollToBottom }) {
  const [incomingMsg, setIncomingMsg] = useState("");
  const { currentRoomId } = useContext(ChatAdminContext);

  const sendHandler = () => {
    const data = {
      message: incomingMsg,
      sender_id: 0,
      time_stamp: Date.now(),
      chat_room_id: currentRoomId
    };

    socket.emit("chat message", data, currentRoomId);
    setChatHistory((prev) => [...prev, data]);
    setIncomingMsg("");
    scrollToBottom();
  };

  useEffect(() => {
    socket.on("chat message", (data) => {
      setChatHistory((prev) => [...prev, data]);
    });
  }, [socket]);

  return (
    <div className="absolute bottom-5 mt-[60px] flex w-[calc(100%-80px)]">
      <textarea
        type="text"
        className="w-full rounded-lg border border-solid border-chatroom-gray px-2 py-2"
        placeholder="請輸入訊息"
        value={incomingMsg}
        onChange={(e) => setIncomingMsg(e.target.value)}
      />
      <button
        onClick={sendHandler}
        className="ml-[20px] h-[40px] w-[100px] rounded-lg bg-chatroom-light-gray"
      >
        送出
      </button>
    </div>
  );
}
