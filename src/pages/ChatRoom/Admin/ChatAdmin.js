import React from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import SplitPane from "react-split-pane";

function ChatAdmin() {
  return (
    <SplitPane
      minSize={125}
      defaultSize={250}
      className="flex-grow"
      style={{ position: "static" }}
    >
      <Sidebar />
      <ChatWindow />
    </SplitPane>
  );
}

export default ChatAdmin;
