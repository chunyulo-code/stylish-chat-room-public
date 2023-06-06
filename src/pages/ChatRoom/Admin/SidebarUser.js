import React, { useContext } from "react";
import { ChatAdminContext } from "../../../context/chatAdminContext";
import io from "socket.io-client";

const SERVER = "wss://ctceth.com:8080";
const socket = io.connect(SERVER);

export default function SidebarUser({ picture, name, chatRoomId }) {
  const { setCurrentRoomId } = useContext(ChatAdminContext);

  const joinRoom = (room_id) => {
    socket.emit("join room", room_id);
  };

  return (
    <div
      className="flex h-[65px] cursor-pointer items-center border-b border-solid border-chatroom-gray px-[30px] py-[10px] hover:bg-gray-100"
      onClick={() => {
        setCurrentRoomId(chatRoomId);
        joinRoom(chatRoomId);
      }}
    >
      <div className="h-[40px] w-[40px]">
        <img src={picture} alt={chatRoomId} className="h-full rounded-full" />
      </div>
      <div className="text-md ml-[30px] text-chatroom-gray">{name}</div>
    </div>
  );
}
