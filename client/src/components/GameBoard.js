import React from 'react';
import GameCell from './GameCell';
import './GameBoard.css';

const GameBoard = ({ gameState, onCellClick }) => (
    <div className="game-board">
        {gameState.map((row, rowIndex) => (
            <div key={rowIndex} className="game-row">
                {row.map((cell, cellIndex) => (
                    <GameCell
                        key={cellIndex}
                        value={cell}
                        onClick={() => onCellClick(rowIndex, cellIndex)}
                    />
                ))}
            </div>
        ))}
    </div>
);

export default GameBoard;
