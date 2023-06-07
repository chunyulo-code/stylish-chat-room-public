import React, { useState, useEffect, useContext } from "react";
import SidebarUser from "./SidebarUser";
import { ChatAdminContext } from "../../../context/chatAdminContext";

export default function Sidebar() {
  const { chats, initSidebar } = useContext(ChatAdminContext);

  useEffect(() => {
    initSidebar();
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
