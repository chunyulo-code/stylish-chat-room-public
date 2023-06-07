import React, { useState, useEffect, useRef, useContext } from "react";
import UserMessage from "./UserMessage";
import AdminMessage from "./AdminMessage";
import TextArea from "./TextArea";
import { ChatAdminContext } from "../../../context/chatAdminContext";

export default function ChatWindow() {
  const [chatHistoty, setChatHistory] = useState([]);
  const msgContainer = useRef(null);
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

  useEffect(() => {
    const scrollToBottom = () => {
      msgContainer.current?.lastElementChild?.scrollIntoView({
        behavior: "smooth"
      });
    };
    scrollToBottom();
  }, [chatHistoty]);

  return (
    <div className="relative h-full px-[40px] pb-[100px] pt-[40px]">
      <div className="h-full  overflow-y-scroll" ref={msgContainer}>
        {chatHistoty.length &&
          chatHistoty.map((msg, index) => {
            if (msg.sender_id === 40)
              return (
                <AdminMessage
                  img="https://picsum.photos/60"
                  msg={msg.message}
                  timestamp={msg.time_stamp}
                  key={index}
                />
              );
            return (
              <UserMessage
                img="https://picsum.photos/60"
                msg={msg.message}
                name={msg.name}
                timestamp={msg.time_stamp}
                key={index}
              />
            );
          })}
      </div>
      <TextArea setChatHistory={setChatHistory} />
    </div>
  );
}
