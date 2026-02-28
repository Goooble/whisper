// Creates a new WebSocket connection to the specified URL.
function createSocket(name) {
  const socket = new WebSocket("ws://localhost:8000/?user=" + name);
  // Executes when the connection is successfully established.
  socket.addEventListener("open", (event) => {
    console.log("WebSocket connection established!");
    // Sends a message to the WebSocket server.
    socket.send("Hello Server!");
  });
  // Listen for messages and executes when a message is received from the server.
  socket.addEventListener("message", (event) => {
    console.log("server: ", event.data);
  });
  // Executes when the connection is closed, providing the close code and reason.
  socket.addEventListener("close", (event) => {
    console.log("WebSocket connection closed:", event.code, event.reason);
  });
  // Executes if an error occurs during the WebSocket communication.
  socket.addEventListener("error", (error) => {
    console.error("WebSocket error:", error);
  });
  return socket;
}

export { createSocket };
