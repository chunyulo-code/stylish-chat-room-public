import React from "react";
import UserMessage from "./UserMessage";
import AdminMessage from "./AdminMessage";

export default function ChatWindow() {
  return (
    <div className="h-full px-[85px] py-[80px]">
      <UserMessage />
      <AdminMessage />
    </div>
  );
}
