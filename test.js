

const createSockets = (cb) => {
  const socket = new WebSocket('ws://localhost:8080/');
  socket.onopen = () => console.log('Socket open');
  socket.onmessage = msg => cb(msg);
  socket.onclose = () => console.log('Socket closed');
  return socket;
};



window.onload = () => {
  const ws = createSockets(msg => console.log(msg));
  const content = document.getElementById('content');
  content.innerHTML = 'This is working';
  const inputField = document.createElement('input')
  inputField.setAttribute('type', 'text')
  inputField.setAttribute('value', '');
  content.appendChild(inputField);
  const button = document.createElement('button');
  button.onclick = () => ws.send(JSON.stringify({
    type: 'bet',
    username: inputField.value,
  }));  // Change to send objects; inputField.value
  button.innerHTML = 'send';
  content.appendChild(button);
};
