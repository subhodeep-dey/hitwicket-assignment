const sendMove = (player, char, move) => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onopen = () => {
        ws.send(JSON.stringify({ player, char, move }));
    };
};

export { sendMove };
