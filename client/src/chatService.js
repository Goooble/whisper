function handleMessage(message, setConnectedUsers) {
  const handler = dispatcher[message.command];
  handler(message, setConnectedUsers);
}

const dispatcher = {
  activeUsers: handleActiveUsers,
  network: handleNetworkStatus,
};
function handleActiveUsers(message, setConnectedUsers) {
  setConnectedUsers(message.activeUsers);
  console.log("setting users");
}
function handleNetworkStatus(message) {
  console.log(message.status);
}

export { handleMessage };
