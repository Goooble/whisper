import { useEffect, useState } from "react";

function UI({ name, setName, connectedUsers, sendMessage, messages }) {
  let [text, setText] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  let effectiveUser = selectedUser === "" ? connectedUsers[0] : selectedUser;
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
      <label htmlFor="dm"></label>
      <select
        name="dm"
        id="dm"
        onChange={(event) => {
          console.log("triggered");
          setSelectedUser(event.target.value);
        }}
      >
        {connectedUsers.map((item) => {
          return <option value={item}>{item}</option>;
        })}
      </select>
      <div>
        <div>
          {messages.map((item) => {
            return (
              <div>
                {item.sender}: {item.text}
              </div>
            );
          })}
          <div>
            <span></span>
          </div>
        </div>
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
                sendMessage(effectiveUser, text);
                setText("");
              }
            }}
          ></textarea>
          <button
            onClick={() => {
              sendMessage(effectiveUser, text);
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

export { UI };
