import React, { useState, useEffect, useRef, useContext } from "react";
import UserMessage from "./UserMessage";
import AdminMessage from "./AdminMessage";
import TextArea from "./TextArea";
import { ChatAdminContext } from "../../../context/chatAdminContext";

export default function ChatWindow() {
  const [chatHistoty, setChatHistory] = useState([]);
  const { currentRoomId, isSidebarLoaded, setIsSidebarLoaded } =
    useContext(ChatAdminContext);
  const jwtToken = window.localStorage.getItem("jwtToken");
  console.log(currentRoomId);

  useEffect(() => {
    if (!currentRoomId) return;
    fetch(`https://ctceth.com/api/1.0/chatroom/history/${currentRoomId}`, {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`
      })
    })
      .then((data) => data.json())
      .then((jsonData) => {
        setChatHistory(jsonData.data);
        console.log("Fetch chatroom history again");
        console.log(jsonData.data);
      });
  }, [currentRoomId]);

  return (
    <div className="px-[40px] pb-[100px] pt-[40px]">
      {chatHistoty.length &&
        chatHistoty.map((msg) => {
          if (msg.sender_id === 40)
            return (
              <AdminMessage
                img="https://picsum.photos/60"
                msg={msg.message}
                timestamp={msg.time_stamp}
              />
            );
          return (
            <UserMessage
              img="https://picsum.photos/60"
              msg={msg.message}
              timestamp={msg.time_stamp}
            />
          );
        })}
      <TextArea setChatHistory={setChatHistory} />
    </div>
  );
}
