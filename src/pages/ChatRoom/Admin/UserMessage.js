import React, { useContext } from "react";
import { ChatAdminContext } from "../../../context/chatAdminContext";

export default function UserMessage({ msg, timestamp, img }) {
  const { timeFormatter } = useContext(ChatAdminContext);
  // timestamp = 1685912637893;

  return (
    <div className="mt-5 flex first:mt-0">
      <div className="h-[40px] w-[40px] ">
        <img src={img} alt="" className="h-full rounded-full" />
      </div>
      <div className="ml-3">
        <div className="text-sm text-chatroom-gray">黃鵬宇</div>
        <div className="flex items-end">
          <span className="mt-2 rounded-lg bg-chatroom-light-gray px-3 py-2 text-sm text-chatroom-gray">
            {msg}
          </span>
          <span className="ml-2 text-xs">{timeFormatter(timestamp)}</span>
        </div>
      </div>
    </div>
  );
}
