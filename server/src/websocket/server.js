const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const Game = require('../game/gameLogic');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let game = new Game();

wss.on('connection', ws => {
    ws.on('message', message => {
        const { player, char, move } = JSON.parse(message);
        const result = game.moveCharacter(player, char, move);

        if (result.isValid) {
            broadcastGameState();
        } else {
            ws.send(JSON.stringify({ type: 'invalid', message: result.message }));
        }
    });

    ws.send(JSON.stringify({ type: 'init', state: game.getGameState() }));
});

function broadcastGameState() {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'update', state: game.getGameState() }));
        }
    });
}

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
