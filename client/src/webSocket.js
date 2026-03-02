function mapper(dispatcher, data) {
  switch (data.command) {
    case "activeUsers":
      dispatcher({ type: "handleConnectedUsers", data: data.activeUsers });
      break;
    case "directMessage":
      dispatcher({
        type: "handleDirectMessage",
        sender: data.sender,
        text: data.text,
      });
  }
  //so that i can separate the incoming server data and the frontEnd handlers
  //if server changes API, update the if conditions
  //if frontend changes, change teh dispatcher type
}

// Creates a new WebSocket connection to the specified URL.
function createSocket(name, dispatcher) {
  const socket = new WebSocket("ws://localhost:8000/?user=" + name);
  socket.addEventListener("open", (event) => {
    console.log("Server: WebSocket connection established!");
    // socket.send("testing: Hello Server!"); //will break server
  });

  socket.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    console.log(data);
    mapper(dispatcher, data);
  });

  socket.addEventListener("close", (event) => {
    console.log("WebSocket connection closed:", event.code, event.reason);
  });

  socket.addEventListener("error", (error) => {
    console.error("WebSocket error:", error);
  });
  return socket;
}

const sender = (function () {
  function sendDirectMessage(socket, sender, receiver, data) {
    socket.send(
      JSON.stringify({
        command: "sendDirectMessage",
        sender,
        receiver,
        text: data,
      }),
    );
  }

  return { sendDirectMessage };
})();

export { createSocket, sender };
