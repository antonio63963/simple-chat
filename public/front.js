
console.log('works');
const socket = io();
const inputMsg = document.querySelector('#userMsg');
const msgBtn = document.querySelector('.sendMsgBtn');
const allMessages = document.querySelector('.allMessages');
const inputName = document.querySelector('.userName');
const submitName = document.querySelector('.submitName');
const submitForm = document.querySelector('.submitForm');
const container = document.querySelector('.container');
const participants = document.querySelector('.participants');
let allUsers = null;


let userName = '';
let shortName = '';


function showWriting(data) {
  const { id, userName, msg} = data;
  const writer = `
    <div id="${id}">
    <h4>${userName}</h4>
    <p>${msg}</p>
    </div>
  `;
  allMessages.insertAdjacentHTML("beforeend", writer);
};

function drawParticipant(userName, shortName, id) {
  const template = `
    <div class="participant" data-id="${id}">
    <div class="circle partice">
      ${shortName}
    </div>
    <h4 class="userName">${userName}</h4>
    <div class="hidden typing">
      <div class="moveTyping one"></div>
      <div class="moveTyping second"></div>
      <div class="moveTyping third"></div>
      </div>
    </div>
  `;

  participants.insertAdjacentHTML('beforeend', template)
};

function addMessage(data, typeMes = '') {
  const { msg, userName, shortName } = data;
  console.log(data);
  const newMess = `
    <div class="newMsg ${typeMes}">
     <div class="msg-title">
        <div class="circle partice">
          <h6>${userName.substr(0,2)}</h6>
        </div>
          <span>${userName}</span>
     </div>
      <p>${msg}</p>
    </div>
  `;
  allMessages.insertAdjacentHTML("beforeend", newMess);
  allMessages.scrollTop = allMessages.scrollHeight;
};

function findTypingUser(id) {
  const allTypings = [...document.querySelectorAll('.typing')];
  return allTypings.find(user => user.parentElement.dataset.id == id);
};


submitForm.addEventListener('click', (e) => {
  e.preventDefault();
  userName = inputName.value;
  shortName = userName.substr(0, 3);
  socket.emit('userData', {userName, shortName} , (data) => {
    if(data.status === 'success') {
      container.classList.remove('smallSize');
      document.querySelector('header').classList.remove('startHeader');
      document.querySelector('.participants').classList.remove('startParticipants');
      document.querySelector('.formLogin').style.display = 'none';

      document.querySelector('.titleHeader').classList.remove('upMove');
      document.querySelector('.leaveBtn').classList.remove('upMove');
console.log(data.participantsArr);
      data.participantsArr.forEach(part => {
        drawParticipant(part.userName, part.shortName, part.id);
      });
      allUsers = [...document.querySelectorAll('.participant')];
      run();
    }
  })
});


//send- recieve new msg
function run() {
  msgBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const msg = inputMsg.value;
    socket.emit('/chat', {msg, userName});
    addMessage({msg, userName, shortName}, 'mySms');
    inputMsg.value = '';
  });
  
  socket.on('/newMsg', data => {
    console.log(data);
    addMessage(data, 'notMySms');
  });
  
  // ========= new USER ============
  
  socket.on('newUser', data => {
    const { userName, shortName, id } = data;
    console.log("newUser: ", data);
    drawParticipant(userName, shortName, id);
  });

  //========= LEAVE USER ============

  socket.on('leaveUser', data => {
    allUsers.find( user => user.dataset.id = data.id).remove();
  })
  
  //  ======== USER TYPING ============
  
  let counter = null;
  inputMsg.addEventListener('keypress', (e) => {
    clearTimeout(counter);
    counter = setTimeout(() => {
      socket.emit('finishTyping', {userName, shortName})
    }, 2000);
    if(counter) {
      socket.emit('typing', {userName, shortName});
    }
  });
 
  socket.on('userTyping', data => {
    findTypingUser(data.id).classList.remove('hidden');
  });

  socket.on('userFinishTyping', data => {
    findTypingUser(data.id).classList.add('hidden');
  });

}


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





