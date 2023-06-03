import React from "react";

export default function UserMessage({ msg, timestamp, img }) {
  return (
    <div className="flex">
      <div className="h-[60px] w-[60px] ">
        <img src={img} alt="" className="h-full rounded-full" />
      </div>
      <div className="ml-4">
        <div className="text-chatroom-gray">黃鵬宇</div>
        <div className="flex items-end">
          <span className="mt-4 rounded-lg bg-chatroom-light-gray px-4 py-2 text-chatroom-gray">
            {msg}
          </span>
          <span className="ml-2 text-sm">{timestamp}</span>
        </div>
      </div>
    </div>
  );
}
