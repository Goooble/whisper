import { useEffect, useReducer, useRef, useState } from "react";
import "./App.css";
import { createSocket } from "./webSocket";
import { UI } from "./UI";

function sendMessage() {}

function reciever(state, action) {
  switch (action.type) {
    case "handleConnectedUsers":
      return { connectedUsers: action.data };
  }
  return state;
}

function App() {
  let socketRef = useRef(null);

  // let [messages, setMessages] = useState(["I am already here", "HERE"]);
  let [text, setText] = useState("");
  let [name, setName] = useState("");
  const [state, dispatcher] = useReducer(reciever, { connectedUsers: [] });
  useEffect(() => {
    socketRef.current = createSocket(name, dispatcher);
    return () => {
      socketRef.current.close(1000, "Rename");
    };
  }, [name]);
  return (
    <UI
      name={name}
      setName={setName}
      connectedUsers={state.connectedUsers}
      setText={setText}
      text={text}
      sendMessage={sendMessage}
      socketRef={socketRef}
    ></UI>
  );
}

export default App;
