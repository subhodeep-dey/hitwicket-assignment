const validateMove = (grid, player, char, move) => {
    const [row, col] = findCharacterPosition(grid, char, player);
    if (row === -1 || col === -1) return { isValid: false, message: 'Character not found' };

    return { isValid: true, message: '' };
};

const findCharacterPosition = (grid, char, player) => {
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            if (grid[r][c] === `${player}-${char}`) {
                return [r, c];
            }
        }
    }
    return [-1, -1];
};

module.exports = { validateMove, findCharacterPosition };
