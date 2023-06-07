import { useEffect, useState, useRef, useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import Loading from "./Loading";
import UserMessage from "./UserMessage";
import AdminMessage from "./AdminMessage";
import InputMessage from "./InputMessage";

import loadingIcon from "./loading.gif";

import io from "socket.io-client";
const SERVER = "wss://ctceth.com:8080";
const socket = io.connect(SERVER);

const fetchData = async (url, jwt) => {
  const config = {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    }),
  };
  const response = await fetch(url, config);
  const jsonData = await response.json();
  const data = jsonData.data;
  return data;
};

const convertTimeStampToTwoDigits = (data) => {
  data.map((item) => {
    const time_stamp = item["time_stamp"];
    const date = new Date(time_stamp);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const newTimeStamp = `${hours}:${minutes}`;
    item["time_stamp"] = newTimeStamp;
    return item;
  });
  return data;
};

export default function ChatUser() {
  // Get profile from context
  const { profile } = useContext(AuthContext);

  // Message list reference
  const messageRef = useRef(null);

  // Message states
  const [historyMessage, setHistoryMessage] = useState([]);
  const [sentMessage, setSentMessage] = useState("");

  // Loading state
  const [loading, setLoading] = useState(true);

  const sendMessageToSocket = () => {
    if (!profile) return;
    socket.emit(
      "chat message",
      {
        message: sentMessage,
        sender_id: profile.user.id,
        time_stamp: Date.now(),
        name: profile.user.name,
        picture: profile.user.picture,
      },
      profile.user.id
    );
  };

  // Join the room
  useEffect(() => {
    const joinRoom = () => {
      socket.emit("join room", profile.user.id);
    };
    if (!profile) return;
    joinRoom();
  }, [profile]);

  // Fetch history message
  useEffect(() => {
    async function getChatMessage() {
      if (!profile) return;
      const data = await fetchData(
        `https://ctceth.com/api/1.0/chatroom/history/${profile.user.id}`,
        profile["access_token"]
      );
      const newData = convertTimeStampToTwoDigits(data);
      setHistoryMessage(newData);
      setLoading(false);
    }
    getChatMessage();
  }, [profile]);

  // Receive data from the admin
  useEffect(() => {
    socket.on("chat message", (data) => {
      if (!data) return;
      const time_stamp = data["time_stamp"];
      const date = new Date(time_stamp);
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const newTimeStamp = `${hours}:${minutes}`;
      data["time_stamp"] = newTimeStamp;
      setHistoryMessage((prevMessage) => [...prevMessage, data]);
    });
  }, []);

  // Scroll to the bottom
  useEffect(() => {
    const scrollToBottom = () => {
      messageRef.current?.lastElementChild?.scrollIntoView({
        behavior: "smooth",
      });
    };
    scrollToBottom();
  }, [historyMessage]);

  return (
    <main className="mx-auto mb-[40px] mt-[40px] flex h-[calc(100vh_-_140px_-_40px_-_40px_-_115px)] max-w-[1425px] flex-col rounded-[15px] border border-solid border-[#979797] px-[60px] py-[40px] xl:max-w-[1140px] lg:mb-[20px] lg:mt-[20px] lg:h-[calc(100vh_-_102px_-_20px_-_20px_-_146px_-_60px)] lg:max-w-none lg:border-0 lg:p-0 lg:px-[40px]">
      <div
        className="relative mb-auto flex h-full flex-col gap-y-5 overflow-auto pr-[15px] scroll-smooth scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-chatroom-gray scrollbar-thumb-rounded-lg lg:gap-y-[25px]"
        ref={messageRef}
      >
        {loading ? (
          <Loading icon={loadingIcon} />
        ) : (
          historyMessage &&
          historyMessage.map((message, index) =>
            message["sender_id"] !== 26 ? (
              <UserMessage userChat={message} key={index} />
            ) : (
              <AdminMessage adminChat={message} key={index} />
            )
          )
        )}
      </div>
      <InputMessage
        sentMessage={sentMessage}
        setSentMessage={setSentMessage}
        setHistoryMessage={setHistoryMessage}
        sendMessageToSocket={sendMessageToSocket}
        profile={profile}
      />
    </main>
  );
}
