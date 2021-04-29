// const express = require('express');
// const app = express();
// var cors = require('cors')
// app.use(cors())
// const server = http.createServer(app);
// const io = require('socket.io')(server, {
//     cors: {
//         origin: "*",
//         credentials: true
//     }
// });

// io.on('connection', onConnection);

// function onConnection(socket) {
//     socket.on('drawing', (data) =>
//         socket.broadcast.emit('drawing', data)
//     );

// socket.on('join', function (data) {

//     console.log('======Joined Room========== ');
//     console.log(data);

//     // Json Parse String To Access Child Elements
//     var messageJson = JSON.parse(data);
//     const room = messageJson.room;
//     console.log(room);

//     socket.join(room);

// });

// // On Receiving Individual Chat Message (ic_message)
// socket.on('ic_message', function (data) {
//     console.log('======IC Message========== ');
//     console.log(data);

//     // Json Parse String To Access Child Elements
//     // var messageJson = JSON.parse(data);
//     var messageJson = data;
//     const room = messageJson.room;
//     const message = messageJson.message;

//     console.log(room);
//     // console.log(message);

//     // Sending to all clients in room except sender
//     socket.broadcast.to(room).emit('new_msg', message);

// });

// socket.on('disconnect', function () {
//     console.log('one user disconnected ' + socket.id);
// });

// }

// const port = 8080;
// server.listen(port, () => console.log(`server is running on port ${port}`));


const express = require("express");
const cors = require("cors");
const http = require('http');

// create express app
const app = express(); 
app.use(cors());
/* Request Middleware */
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Headers", "token");
    res.header("Access-Control-Max-Age", "10000");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.set("view engine", "jade");
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        credentials: true
    }
});
io.on('connection', onConnection);

function onConnection(socket) {
    socket.on('drawing', (data) =>
        socket.broadcast.emit('drawing', data)
    );
}

console.log("process.env.PORT ":process.env.PORT );
server.listen(process.env.PORT || 5000, () => console.log(`server is running on port ${ process.env.PORT || 5000}`));
