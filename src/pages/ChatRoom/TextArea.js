import React from "react";

export default function TextArea() {
  return (
    <div className="mt-[60px] flex">
      <textarea
        type="text"
        className="w-full rounded-lg border border-solid border-chatroom-gray px-2 py-2"
      >
        收到的包裹與訂單不符
      </textarea>
      <button className="ml-[20px] h-[40px] w-[100px] rounded-lg bg-chatroom-light-gray">
        送出
      </button>
    </div>
  );
}
