// ye node server hai jo socket.io ko handle karenga
// const io = require('socket.io')();
// io.on('connection', client => { ... });
// io.listen(3000);
const io = require('socket.io')(8000)
 // here i have initialized socket.io on 8000 port no.
 // socket.io server hai like it connect with http.




const users = {};

// connection aaye socket mein toh arrow func. ko run kar do.
// io.on use kiya agar chat mein new member add hua or open kiya toh msg aajayenga

// install nodemon (npm i nodemon or npm install -g nodemon)
// and change the package.json main landing page ("main": "nodemon index.js" line no 5 hai dekh lo.)
// abb cmd open then (nodemon index.js)
io.on('connection', socket =>{
	socket.on('new-user-joined', name =>{
		// console.log("New user",name); it will show new user msg. on browser and cmd .. just to check whether has anyone joined or not..nodemon pe error bhi ayenga comment kiya toh..so avoid that err.
		users[socket.id] = name; //it will provide name for each connection.
		socket.broadcast.emit('user-joined',name);
	});

	socket.on('send',message =>{
		socket.broadcast.emit('receive',{message : message, name : users[socket.id]})

	});


	socket.on('disconnect',message =>{
		socket.broadcast.emit('left',users[socket.id]);
		delete users[socket.id];

	});
}) 