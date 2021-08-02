
console.log('works');
const socket = io();
const inputMsg = document.querySelector('.userMsg');
const msgBtn = document.querySelector('.sendMsgBtn');
const allMessages = document.querySelector('.messages');
const inputName = document.querySelector('.userName');
let userName = '';

function delElem(id) {
  const el = document.getElementById(`${id}`);
  el.remove()
};

function showWriting(data) {
  const { id, userName, msg} = data;
  const writer = `
    <div id="${id}">
    <h4>${userName}</h4>
    <p>${msg}</p>
    </div>
  `;
  allMessages.insertAdjacentHTML("beforeend", writer);
}
function addMessage(data, typeMes = '') {
  console.log(data);
  const msg = data.msg;
  const name = data.userName;
    const newMess = `
    <div class="newMsg ${typeMes}">
    <h4>${name}</h4>
    <p>${msg}</p>
    </div>
  `;
  allMessages.insertAdjacentHTML("beforeend", newMess);
};

//send- recieve new msg

msgBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const msg = inputMsg.value;
  socket.emit('/chat', {msg, userName});
  addMessage({msg, userName}, 'mySms');
  inputMsg.value = '';
  
});

socket.on('/newMsg', data => {
  console.log(data);
  addMessage(data, 'notMySms');
});

// whatchig for input changes
inputName.addEventListener('change', (e) => {
  userName = e.target.value;
});
inputMsg.addEventListener('change', (e) => {
  socket.emit('mesHasWrote', {userName});
});

inputMsg.addEventListener('input', (e) => {
  socket.emit('mesWriting', {userName});
});
socket.on('whoHasWrote', data => {
  delElem(data.id)
});

socket.on('whoIsWriting', (data) => {
  if(!document.getElementById(`${data.id}`)) {
    showWriting(data);
  } 
});





