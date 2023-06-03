import React from "react";

export default function UserMessage() {
  return (
    <div className="flex">
      <div className="h-[60px] w-[60px] rounded-full bg-chatroom-light-gray"></div>
      <div className="ml-4">
        <div className="text-chatroom-gray">黃鵬宇</div>
        <div className="flex items-end">
          <span className=" mt-4 rounded-lg bg-chatroom-light-gray px-4 py-2 text-chatroom-gray">
            嗨你好
          </span>
          <span className="ml-2 text-sm">14:00</span>
        </div>
      </div>
    </div>
  );
}
