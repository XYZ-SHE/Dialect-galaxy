const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

io.on('connection', (socket) => {
    console.log('New user');
    socket.on('new_community_comment', (data) => {
        console.log('comment:', data);
        socket.broadcast.emit('broadcast_comment', data);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});