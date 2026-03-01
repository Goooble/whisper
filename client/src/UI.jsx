function UI({
  name,
  setName,
  connectedUsers,
  setText,
  text,
  sendMessage,
  socketRef,
}) {
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
      <select name="dm" id="dm">
        {connectedUsers.map((item) => {
          return <option value={item}>{item}</option>;
        })}
      </select>
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

export { UI };
