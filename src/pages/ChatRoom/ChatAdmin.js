import React from "react";
import Split from "react-split";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";

function ChatAdmin() {
  return (
    <div className="h-full">
      <Split
        className="flex"
        sizes={[20, 80]}
        minSize={[285, 0]}
        expandToMin={true}
        gutterSize={10}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
      >
        <Sidebar />
        <ChatWindow />
      </Split>
    </div>
  );
}

export default ChatAdmin;
