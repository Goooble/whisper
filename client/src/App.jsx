import { useEffect, useReducer, useRef, useState } from "react";
import "./App.css";
import { createSocket } from "./webSocket";
import { UI } from "./UI";
import { sender } from "./webSocket";

function reciever(state, action) {
  switch (action.type) {
    case "handleConnectedUsers":
      return { ...state, connectedUsers: action.data };
    case "handleDirectMessage":
      return {
        ...state,
        messages: [
          ...state.messages,
          { sender: action.sender, text: action.text },
        ],
      };
  }
  return state;
}

function App() {
  let socketRef = useRef(null);

  // let [messages, setMessages] = useState(["I am already here", "HERE"]);

  const [name, setName] = useState("");
  //handles recieveing events
  const [state, dispatcher] = useReducer(reciever, {
    connectedUsers: [],
    messages: [],
  });
  //socket connections
  useEffect(() => {
    socketRef.current = createSocket(name, dispatcher);
    return () => {
      socketRef.current.close(1000, "Rename");
    };
  }, [name]);
  function sendMessage(reciever, text) {
    console.log(text);
    sender.sendDirectMessage(socketRef.current, name, reciever, text);
  }
  console.log(state.messages);
  return (
    <UI
      name={name}
      setName={setName}
      connectedUsers={state.connectedUsers}
      sendMessage={sendMessage}
      messages={state.messages}
    ></UI>
  );
}

export default App;
