import React from "react";
import UserMessage from "./UserMessage";
import AdminMessage from "./AdminMessage";
import TextArea from "./TextArea";

export default function ChatWindow() {
  return (
    <div className="h-full px-[85px] py-[80px]">
      <UserMessage
        img="https://picsum.photos/60"
        msg="嗨你好"
        timestamp="14:00"
      />
      <AdminMessage msg="您好，有什麼需要為您服務？" timestamp="14:01" />
      <UserMessage
        img="https://picsum.photos/60"
        msg="收到的包裹與訂單不符"
        timestamp="14:02"
      />
      <AdminMessage msg="您好，有什麼需要為您服務？" timestamp="14:03" />
      <UserMessage msg="嗨你好" timestamp="14:04" />
      <AdminMessage
        msg="好的，請提供訂單編號，這邊幫您確認一下，請稍等"
        timestamp="14:05"
      />
      <UserMessage
        img="https://picsum.photos/60"
        msg="好的"
        timestamp="14:06"
      />
      <AdminMessage
        msg="這邊跟您確認一下，您的訂單為 210342214301，購買商品為......"
        timestamp="14:07"
      />
      <TextArea />
    </div>
  );
}
