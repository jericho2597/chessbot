const { Chess } = require('chess.js');

fetch("https://api.chess.com/pub/player/jerry_j2597/games/2023/10/pgn")
    .then(async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const text = await response.text();
        processApiResponse(text);
    })
    .catch(function (err) {
        console.log("Unable to fetch chess data", err);
    });

function processApiResponse(text) {
    const games = text.split(/\n\n\n/);

    for (let i = 0; i < games.length; i++) {
        processGame(games[i]);
    }
}

function processGame(game) {
    const chess = new Chess();
    chess.loadPgn(game);

    console.log(chess.history({ "verbose": true }));
}