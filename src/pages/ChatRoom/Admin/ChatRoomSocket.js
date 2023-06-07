import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const SERVER = "wss://ctceth.com:8080";
const MY_SERVER = "http://localhost:3001";

const socket = io.connect(SERVER);
const randomName = Math.round(Math.random() * 100);

export default function ChatRoom() {
  const [msg, setMsg] = useState("");
  const [room, setRoom] = useState("");
  const [allMsg, setAllMsg] = useState([]);

  const sendMessage = () => {
    socket.emit("chat message", { randomName, msg, room }, room);
    setAllMsg((prev) => [...prev, `${randomName}: ${msg}`]);
    setMsg("");
  };

  const joinRoom = () => {
    socket.emit("join room", room);
  };

  useEffect(() => {
    socket.on("chat message", (data) => {
      setAllMsg((prev) => [...prev, `${data.randomName}: ${data.msg}`]);
    });
  }, [socket]);

  console.log(allMsg);

  return (
    <div className="flex items-center justify-center">
      <div>
        <h1 class="mb-6 mt-5 text-center text-xl font-bold">
          Welcom to Chat-Room
        </h1>
        <div className="flex items-center">
          <input
            placeholder="Room name..."
            className="rounded-md border px-2"
            value={room}
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
          <button
            className="ml-2 rounded-md border bg-gray-400 px-4 py-1 text-sm text-white"
            onClick={joinRoom}
          >
            Join Room
          </button>
        </div>
        <div className="flex items-center">
          <input
            placeholder="Messages..."
            className="rounded-md border px-2"
            value={msg}
            onChange={(e) => {
              setMsg(e.target.value);
            }}
          />
          <button
            className="ml-2 rounded-md border bg-gray-400 px-4 py-1 text-sm text-white"
            onClick={sendMessage}
          >
            Send Message
          </button>
        </div>
        <div className="mt-5 rounded-md bg-black py-2 text-center text-white">
          User name: {randomName}
        </div>
        <div className="mt-5 rounded-md bg-black py-2 text-center text-white">
          Room name: {room}
        </div>
        <div className="mt-5 rounded-md bg-red-300 text-center text-lg text-white">
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
