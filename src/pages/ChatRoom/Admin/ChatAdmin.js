import React from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";

function ChatAdmin() {
  return (
    <div className="h-[calc(100vh-102px-208px)] chun-lg:h-[calc(100vh-140px-115px)]">
      <Allotment defaultSizes={[125, 200]}>
        <Allotment.Pane minSize={125}>
          <Sidebar />
        </Allotment.Pane>
        s
        <Allotment.Pane snap>
          <ChatWindow />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}

export default ChatAdmin;
