import { createContext, useState } from "react";

export const ChatAdminContext = createContext({
  currentRoomId: null,
  isSidebarLoaded: false,
  chats: [],
  setChats: () => {},
  setIsSidebarLoaded: () => {},
  setCurrentRoomId: () => {},
  initSidebar: () => {},
  updateSidebar: () => {},
  timeFormatter: () => {}
});

export const ChatAdminContextProvider = ({ children }) => {
  const [isSidebarLoaded, setIsSidebarLoaded] = useState(false);
  const [chats, setChats] = useState([]);
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const jwtToken = window.localStorage.getItem("jwtToken");

  function initSidebar() {
    updateSidebar().then((data) => setCurrentRoomId(data[0].chat_room_id));
  }

  function updateSidebar() {
    return new Promise((resolve) => {
      fetch("https://ctceth.com/api/1.0/admin/chatroom", {
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`
        })
      })
        .then((data) => data.json())
        .then((jsonData) => {
          setChats(jsonData.data);
          setIsSidebarLoaded(true);
          resolve(jsonData.data);
        });
    });
  }

  function timeFormatter(timestamp) {
    let formattedHours;
    let formattedMinutes;
    const hours = new Date(timestamp).getHours();
    const minutes = new Date(timestamp).getMinutes();
    if (hours < 10) formattedHours = "0" + hours;
    else {
      formattedHours = hours;
    }
    if (minutes < 10) formattedMinutes = "0" + hours;
    else {
      formattedMinutes = minutes;
    }
    return `${formattedHours}:${formattedMinutes}`;
  }

  return (
    <ChatAdminContext.Provider
      value={{
        currentRoomId,
        setCurrentRoomId,
        timeFormatter,
        isSidebarLoaded,
        setIsSidebarLoaded,
        chats,
        setChats,
        initSidebar,
        updateSidebar
      }}
    >
      {children}
    </ChatAdminContext.Provider>
  );
};
