const socket = io('http://localhost:8000'); 


// get DOM element in resp. JS variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")

// audio will ply on receiving msg ...audio bajenga aur kya..
var audio = new Audio('ting.mp3');


// function which will append event info to the container.  
const append =(message,position)=>{
	const messageElement = document.createElement('div');
	messageElement.innerText =message;
	messageElement.classList.add('message');
	messageElement.classList.add(position);
	messageContainer.append(messageElement);
	if(position=='left'){
		audio.play();
	}
	
}


// if the form means the msg get submitted ,send the server message
form.addEventListener('submit',(e)=> {
	e.preventDefault();
	const message = messageInput.value;
	append(`You: ${message}`,'right');
	socket.emit('send',message);
	messageInput.value = ''
})

// ask user name and let server know
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name)


// If a new user join , receive his/her name from server
socket.on('user-joined',name =>{
	append(`${name} joined the chat`, 'right')
})


// if server sed a msg receive it
socket.on('receive',data =>{
	append(`${data.name}: ${data.message}`, 'left')
})	

// if user leaves the chat, append the info to the container so other will know someone has left the chat
socket.on('left',name =>{
	append(`${name} left the chat`, 'right')
})	

