import { createContext, useState } from "react";

export const ChatAdminContext = createContext({
  currentRoomId: null,
  isLoadingSidebar: false,
  isLoadingWindow: false,
  setIsLoadingSidebar: () => {},
  setIsLoadingWindow: () => {},
  setCurrentRoomId: () => {},
  timeFormatter: () => {}
});

export const ChatAdminContextProvider = ({ children }) => {
  const [isLoadingSidebar, setIsLoadingSidebar] = useState(false);
  const [isLoadingWindow, setIsLoadingWindow] = useState(false);
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
    console.log(`${formattedHours}:${formattedMinutes}`);
    return `${formattedHours}:${formattedMinutes}`;
  }

  return (
    <ChatAdminContext.Provider
      value={{
        currentRoomId,
        setCurrentRoomId,
        timeFormatter,
        isLoadingSidebar,
        setIsLoadingSidebar,
        isLoadingWindow,
        setIsLoadingWindow
      }}
    >
      {children}
    </ChatAdminContext.Provider>
  );
};
