import { useEffect, useRef, useState } from "react";
import "./App.css";
import { createSocket } from "./webSocket";
function sendMessage(message, socket) {
  socket.send(message);
}

function App() {
  let socketRef = useRef(null);

  // let [messages, setMessages] = useState(["I am already here", "HERE"]);
  let [text, setText] = useState("");
  let [name, setName] = useState("Gobi");
  useEffect(() => {
    socketRef.current = createSocket(name);

    return () => {
      socketRef.current.close(1000, "Rename");
    };
  }, [name]);
  return (
    <>
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        className="border-2"
        type="text"
        onInput={(e) => setName(e.target.value)}
        value={name}
      />
      <div>
        {/* <div className="flex flex-col">
          {messages.map((item) => (
            <div>{item}</div>
          ))}
        </div> */}
        <div>
          <label htmlFor="messageBox"></label>
          <textarea
            className="border-2"
            name="message"
            id="messageBox"
            onInput={(e) => setText(e.target.value)}
            value={text}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage(name + ": " + text);
                setText("");
              }
            }}
          ></textarea>
          <button
            onClick={() => {
              sendMessage(name + ": " + text, socketRef.current);
              setText("");
            }}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
