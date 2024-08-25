import React from 'react';
import './GameCell.css';

const GameCell = ({ value, onClick }) => (
    <button className="game-cell" onClick={onClick}>
        {value !== null ? value : ' '} {}
    </button>
);

export default GameCell;
