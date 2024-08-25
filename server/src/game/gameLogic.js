const { validateMove, findCharacterPosition } = require('./moveValidation');

class Game {
    constructor() {
        this.grid = Array.from({ length: 5 }, () => Array(5).fill(null));
        this.players = { A: [], B: [] };
        this.currentPlayer = 'A';
    }

    initialize(players) {
        this.players.A = players.A;
        this.players.B = players.B;
        this.placeCharacters(this.players.A, 'A');
        this.placeCharacters(this.players.B, 'B');
    }

    placeCharacters(playerChars, player) {
        const row = player === 'A' ? 0 : 4;
        playerChars.forEach((char, i) => {
            this.grid[row][i] = `${player}-${char}`;
        });
    }

    moveCharacter(player, char, move) {
        if (player !== this.currentPlayer) {
            return { isValid: false, message: 'Not your turn' };
        }

        const result = validateMove(this.grid, player, char, move);
        if (result.isValid) {
            const [row, col] = findCharacterPosition(this.grid, char, player);
            if (row === -1 || col === -1) {
                return { isValid: false, message: 'Character not found' };
            }

            const [newRow, newCol] = [row + move[0], col + move[1]];
            if (this.isWithinBounds(newRow, newCol)) {
                this.grid[row][col] = null;
                this.grid[newRow][newCol] = `${player}-${char}`;
                this.currentPlayer = player === 'A' ? 'B' : 'A';
            } else {
                return { isValid: false, message: 'Move out of bounds' };
            }
        }

        return result;
    }

    checkVictory() {
        const playerChars = this.currentPlayer === 'A' ? this.players.A : this.players.B;
        return playerChars.every(char => {
            const [row, col] = findCharacterPosition(this.grid, char, this.currentPlayer);
            return row === (this.currentPlayer === 'A' ? 4 : 0);
        });
    }

    getGameState() {
        return this.grid;
    }

    isWithinBounds(row, col) {
        return row >= 0 && row < 5 && col >= 0 && col < 5;
    }
}

module.exports = Game;
