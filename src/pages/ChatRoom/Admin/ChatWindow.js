import React, { useState, useEffect, useRef, useContext } from "react";
import UserMessage from "./UserMessage";
import AdminMessage from "./AdminMessage";
import TextArea from "./TextArea";
import { ChatAdminContext } from "../../../context/chatAdminContext";

export default function ChatWindow() {
  const [chatHistoty, setChatHistory] = useState([]);
  const { currentUserId } = useContext(ChatAdminContext);
  const msgContainer = useRef(null);
  const jwtToken = window.localStorage.getItem("jwtToken");
  console.log(currentUserId);

  useEffect(() => {
    fetch("https://ctceth.com/api/1.0/chatroom/history", {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
        user_id: currentUserId
      })
    })
      .then((data) => data.json())
      .then((jsonData) => {
        setChatHistory(jsonData.data);
        console.log("Fetch chatroom history again");
      });
  }, [currentUserId]);

  return (
    chatHistoty && (
      <div className="px-[40px] pb-[100px] pt-[40px]">
        {chatHistoty.map((msg) => {
          if (msg.sender_id === 0)
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
    )
  );
}
