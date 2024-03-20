// GAMEBOARD obj
// create board - how many rows and columns?
// state of the board, where are the X's and O's
// functions for getting the board and printing the board
const gameboard = (function () {
    const rows = 3;
    const columns = 3;
    const board = [];

    function createBoard() {
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                board[i][j] = "";
            }
        }
    }

    function printBoard() {
        for (let i = 0; i < rows; i++) {
            console.log(...board[i]);
        }
    }

    function chosenCellEmpty(row, column) {
        return (board[row][column] === "");
    }

    function markChosenCell(row, column, player) {
        // CHANGE TO SELECTED PLAYER SYMBOL
        board[row][column] = "o";
    }

    return { chosenCellEmpty, createBoard, printBoard };
})();

gameboard.createBoard();
gameboard.printBoard();



// PLAYERS obj
// get player names and create objects for them
// what marker does each player have?
const players = (function () {
    const playersList = [];
    // ask for player's name
    function askForPlayerName() {
        const name = prompt("Type in your name:");
    }
    function createPlayer(name, symbol) {
        return { name, symbol, score: 0 };
    }

    return { createPlayer };
})();

const amy = players.createPlayer("Amy", "x");
console.log(amy);

// const amy = players.createPlayer("Amy", "x");
// console.log(amy);

// GAME CONTROLLER obj
// who starts the game? random seems the best
// whoose turn is it?
// which cell did the user choose?
// is the game a win, or a draw?
// who won and how many games has he won?
// is the selected cell free or already occupied?
const gameController = (function () {
    function playRound() {
        const row = prompt ("Select row (0-2):");
        const column = prompt("Select column (0-2)");
        if (gameboard.chosenCellEmpty(row, column)) {
            gameboard.markChosenCell(row, column, player);
        }
    }

    return { playRound };

})();