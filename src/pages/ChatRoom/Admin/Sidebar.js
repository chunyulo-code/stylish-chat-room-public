import React, { useState, useEffect, useContext } from "react";
import SidebarUser from "./SidebarUser";
import { ChatAdminContext } from "../../../context/chatAdminContext";

export default function Sidebar() {
  const { setCurrentRoomId } = useContext(ChatAdminContext);
  const [chats, setChats] = useState([]);
  const jwtToken = window.localStorage.getItem("jwtToken");

  useEffect(() => {
    fetch("https://ctceth.com/api/1.0/admin/chatroom", {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`
      })
    })
      .then((data) => data.json())
      .then((jsonData) => {
        setChats(jsonData);
        console.log(jsonData);
        setCurrentRoomId(jsonData[0].chat_room_id);
      });
  }, []);

  return (
    <div>
      {chats.map((chat) => (
        <SidebarUser
          picture={chat.picture}
          name={chat.name}
          chatRoomId={chat.chat_room_id}
        ></SidebarUser>
      ))}
    </div>
  );
}
