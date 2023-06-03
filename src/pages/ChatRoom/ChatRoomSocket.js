import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");
const randomName = Math.round(Math.random() * 100);

export default function ChatRoom() {
  const [msg, setMsg] = useState("");
  const [room, setRoom] = useState("");
  const [allMsg, setAllMsg] = useState([]);

  const sendMessage = () => {
    socket.emit("send_message", { randomName, msg, room });
    setAllMsg((prev) => [...prev, `${randomName}: ${msg}`]);
    setMsg("");
  };

  const joinRoom = () => {
    socket.emit("join_room", room);
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setAllMsg((prev) => [...prev, `${data.randomName}: ${data.msg}`]);
    });
  }, []);

  console.log(allMsg);

  return (
    <div className="flex justify-center items-center">
      <div>
        <h1 class="text-xl font-bold mb-6 text-center mt-5">
          Welcom to Chat-Room
        </h1>
        <div className="flex items-center">
          <input
            placeholder="Room name..."
            className="border rounded-md px-2"
            value={room}
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
          <button
            className="border px-4 py-1 bg-gray-400 rounded-md text-white ml-2 text-sm"
            onClick={joinRoom}
          >
            Join Room
          </button>
        </div>
        <div className="flex items-center">
          <input
            placeholder="Messages..."
            className="border rounded-md px-2"
            value={msg}
            onChange={(e) => {
              setMsg(e.target.value);
            }}
          />
          <button
            className="border px-4 py-1 bg-gray-400 rounded-md text-white ml-2 text-sm"
            onClick={sendMessage}
          >
            Send Message
          </button>
        </div>
        <div className="text-center mt-5 bg-black text-white py-2 rounded-md">
          User name: {randomName}
        </div>
        <div className="text-center mt-5 bg-black text-white py-2 rounded-md">
          Room name: {room}
        </div>
        <div className="mt-5 text-center text-lg bg-red-300 rounded-md text-white">
          Messages
        </div>
        <div className="mt-5">
          {allMsg.map((msg) => (
            <p>{msg}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
