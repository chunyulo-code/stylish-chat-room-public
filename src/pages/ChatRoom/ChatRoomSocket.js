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
    setMsg("");
  };

  const joinRoom = () => {
    socket.emit("join_room", room);
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setAllMsg([...allMsg, `${data.randomName}: ${data.msg}`]);
    });
  }, [socket]);

  return (
    <div className="flex justify-center items-center">
      <div>
        <h1 class="text-xl font-bold mb-6">Welcom to Chat-Room</h1>
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
        <div>User name: {randomName}</div>
        <div>Room name: {room}</div>
        <div className="mt-5">Messages: </div>
        <div className="mt-5">
          {allMsg.map((msg) => (
            <p>{msg}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
