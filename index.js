const express = require('express');
const app = express();
const http = require('http'); 
var cors = require('cors')
app.use(cors())
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        credentials: true
    }
});

io.on('connection', onConnection);

function onConnection(socket) {
    socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
}

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`server is running on port ${port}`));
