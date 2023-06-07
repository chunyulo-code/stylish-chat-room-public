import { createContext, useState } from "react";

export const ChatAdminContext = createContext({
  currentRoomId: null,
  isLoadingSidebar: false,
  setIsLoadingSidebar: () => {},
  setCurrentRoomId: () => {},
  timeFormatter: () => {}
});

export const ChatAdminContextProvider = ({ children }) => {
  const [isSidebarLoaded, setIsSidebarLoaded] = useState(false);
  const [currentRoomId, setCurrentRoomId] = useState(null);

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
        setIsSidebarLoaded
      }}
    >
      {children}
    </ChatAdminContext.Provider>
  );
};
