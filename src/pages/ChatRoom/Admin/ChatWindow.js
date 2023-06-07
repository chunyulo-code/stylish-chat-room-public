import React, { useState, useEffect, useRef, useContext } from "react";
import UserMessage from "./UserMessage";
import AdminMessage from "./AdminMessage";
import TextArea from "./TextArea";
import { ChatAdminContext } from "../../../context/chatAdminContext";
import { AuthContext } from "../../../context/authContext";

export default function ChatWindow() {
  const [chatHistoty, setChatHistory] = useState([]);
  const msgContainer = useRef(null);
  const { currentRoomId, isSidebarLoaded, setIsSidebarLoaded } =
    useContext(ChatAdminContext);
  const { adminId } = useContext(AuthContext);
  const jwtToken = window.localStorage.getItem("jwtToken");
  const adminIds = [25, 26, 27];

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

  console.log(chatHistoty[-1]);
  return (
    <div className="relative h-full pb-[100px] pl-[40px] pr-[20px] pt-[40px]">
      <div
        className="h-full overflow-y-scroll pr-[20px] scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-chatroom-gray scrollbar-thumb-rounded-lg"
        ref={msgContainer}
      >
        {!!chatHistoty.length &&
          chatHistoty.map((msg, index) => {
            if (adminIds.includes(msg.sender_id))
              return (
                <AdminMessage
                  msg={msg.message}
                  timestamp={msg.time_stamp}
                  key={index}
                />
              );
            return (
              <UserMessage
                img={msg.picture}
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
