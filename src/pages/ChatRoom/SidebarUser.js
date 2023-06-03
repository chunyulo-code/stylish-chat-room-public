import React from "react";

export default function SidebarUser({ img, userName }) {
  return (
    <div className="flex h-[80px] items-center border-b border-solid border-chatroom-gray px-[30px] py-[10px]">
      <div className="h-[50px] w-[50px]">
        <img src={img} alt="" className="h-full rounded-full" />
      </div>
      <div className="ml-[29px] text-xl text-chatroom-gray">{userName}</div>
    </div>
  );
}
