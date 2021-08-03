
console.log('works');
// const socket = io();
const inputMsg = document.querySelector('#userMsg');
const msgBtn = document.querySelector('.sendMsgBtn');
const allMessages = document.querySelector('.messages');
const inputName = document.querySelector('.userName');
const submitName = document.querySelector('.submitName');
const submitForm = document.querySelector('.submitForm');
const container = document.querySelector('.container');

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
  const msg = data.msg;
  const name = data.userName;
  const newMess = `
    <div class="newMsg ${typeMes}">
      <div class="circle partice">
        <h6>${name}</h6>
      </div>
      <p>${msg}</p>
    </div>
  `;
  allMessages.insertAdjacentHTML("beforeend", newMess);
};

//send- recieve new msg

// msgBtn.addEventListener('click', (e) => {
//   e.preventDefault();
//   const msg = inputMsg.value;
//   socket.emit('/chat', {msg, userName});
//   addMessage({msg, userName}, 'mySms');
//   inputMsg.value = '';
  
// });

// socket.on('/newMsg', data => {
//   console.log(data);
//   addMessage(data, 'notMySms');
// });

submitForm.addEventListener('click', (e) => {
  e.preventDefault();
  container.classList.remove('smallSize');
  document.querySelector('header').classList.remove('startHeader');
  document.querySelector('.participants').classList.remove('startParticipants');
})


// whatchig for input changes
// submitName.addEventListener('click', (e) => {
//   e.preventDefault();
//   userName = inputName.value;
//   socket.emit('sendName', userName);
// });
// inputMsg.addEventListener('change', (e) => {
//   socket.emit('mesHasWrote', {userName});
// });

// inputMsg.addEventListener('input', (e) => {
//   socket.emit('mesWriting', {userName});
// });
// socket.on('whoHasWrote', data => {
//   delElem(data.id)
// });

// socket.on('whoIsWriting', (data) => {
//   if(!document.getElementById(`${data.id}`)) {
//     showWriting(data);
//   } 
// });





