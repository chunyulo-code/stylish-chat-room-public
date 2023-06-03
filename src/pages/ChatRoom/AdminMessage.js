import React from "react";

export default function AdminMessage({ msg, timestamp }) {
  return (
    <div className="mt-[100px] flex items-end text-right">
      <span className="ml-auto text-sm">{timestamp}</span>
      <span className="ml-2 rounded-lg bg-chatroom-light-gray px-4 py-2 text-chatroom-gray">
        {msg}
      </span>
    </div>
  );
}
