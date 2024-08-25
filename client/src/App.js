import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import { sendMove } from './websocket/client';
import './App.css';

const App = () => {
    const [gameState, setGameState] = useState([]);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');
        
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'update') {
                setGameState(data.state);
            }
        };

        return () => ws.close();
    }, []);

    const handleCellClick = (rowIndex, cellIndex) => {
        const char = gameState[rowIndex][cellIndex];
        if (char) {
            const [player, character] = char.split('-');
            const move = prompt('Enter move command:');
            sendMove(player, character, move);
        }
    };

    return (
        <div className="app">
            <h1>Turn-based Game</h1>
            <GameBoard gameState={gameState} onCellClick={handleCellClick} />
        </div>
    );
};

export default App;
