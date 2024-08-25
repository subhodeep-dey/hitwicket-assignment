const initialState = Array.from({ length: 5 }, () => Array(5).fill(null));

const getGameState = (game) => game.getGameState();

export { initialState, getGameState };
