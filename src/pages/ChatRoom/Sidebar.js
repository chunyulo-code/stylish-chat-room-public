import React from "react";
import SidebarUser from "./SidebarUser";

export default function Sidebar() {
  return (
    <div className="h-full">
      <SidebarUser img="https://picsum.photos/50" userName="黃鵬宇" />
      <SidebarUser img="https://picsum.photos/50" userName="駱俊宇" />
      <SidebarUser img="https://picsum.photos/50" userName="詹前村" />
      <SidebarUser img="https://picsum.photos/50" userName="林勤晴" />
    </div>
  );
}
