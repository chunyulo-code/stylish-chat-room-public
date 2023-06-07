import React, { useState, useEffect, useContext } from "react";
import SidebarUser from "./SidebarUser";
import { ChatAdminContext } from "../../../context/chatAdminContext";

export default function Sidebar() {
  const { setCurrentRoomId, setIsSidebarLoaded } = useContext(ChatAdminContext);
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
        setChats(jsonData.data);
        setCurrentRoomId(jsonData.data[0].chat_room_id);
      })
      .then(setIsSidebarLoaded(true));
  }, []);

  return (
    <div className="h-full overflow-y-scroll scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-chatroom-gray scrollbar-thumb-rounded-lg">
      {chats.map((chat) => (
        <SidebarUser
          picture={chat.picture}
          name={chat.name}
          chatRoomId={chat.chat_room_id}
          key={chat.chat_room_id}
        ></SidebarUser>
      ))}
    </div>
  );
}
