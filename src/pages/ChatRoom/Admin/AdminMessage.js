import React, { useContext } from "react";
import { ChatAdminContext } from "../../../context/chatAdminContext";

export default function AdminMessage({ msg, timestamp }) {
  const { timeFormatter } = useContext(ChatAdminContext);
  // timestamp = 1685946496381;

  return (
    <div className="mt-5 flex items-end text-right">
      <span className="ml-auto text-xs">{timeFormatter(timestamp)}</span>
      <span className="bg-chatroom-light-gray text-chatroom-gray ml-2 mt-2 rounded-lg px-3 py-2 text-sm">
        {msg}
      </span>
    </div>
  );
}
