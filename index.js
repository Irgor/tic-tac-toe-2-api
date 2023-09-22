const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: '*' });

io.on('connection', (socket) => {
    console.log('user connected ' + socket.id);

    socket.on('moveType', (playerMove) => {
        const player2Mover = playerMove == 'X' ? 'O' : 'X';
        socket.broadcast.emit('setPlayerRole', player2Mover);
    });

    socket.on('playerMarkMove', (move) => {
        socket.broadcast.emit('sendingMarkedMove', move);
    })

    socket.on('setGameOnBoard', (gameOnBoard) => {
        socket.broadcast.emit('sendingGameOnBoard', gameOnBoard);
    })


});

server.listen(3000, () => {
    console.log('server started');
});