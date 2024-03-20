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

    function markChosenCell(row, column) {
        // CHANGE TO SELECTED PLAYER SYMBOL
        board[row][column] = "o";
    }

    return { chosenCellEmpty, createBoard, printBoard, markChosenCell };
})();

// gameboard.createBoard();
// gameboard.printBoard();



// PLAYERS obj
// get player names and create objects for them
// what marker does each player have?
const players = (function () {
    const playersList = [];

    function askForPlayerName() {
        const name1 = prompt("Player 1 name:");
        const symbol1 = "X";
        const name2 = prompt("Player 2 name:");
        const symbol2 = "O";

        createPlayer(name1, symbol1);
        createPlayer(name2, symbol2);
    }

    function createPlayer(name, symbol) {
        playersList.push({ name, symbol, score: 0 });
        // console.log(playersList);
    }

    function getPlayersList() {
        return playersList;
    }

    return { askForPlayerName, createPlayer, getPlayersList };
})();

// players.askForPlayerName();
// const arr = players.getPlayersList();
// console.log(arr[0].name);

// GAME CONTROLLER obj
// who starts the game? random seems the best
// whoose turn is it?
// which cell did the user choose?
// is the game a win, or a draw?
// who won and how many games has he won?
// is the selected cell free or already occupied?
const gameController = (function () {
    function playRound() {
        const row = prompt("Select row (0-2):");
        const column = prompt("Select column (0-2)");
        if (gameboard.chosenCellEmpty(row, column)) {
            gameboard.markChosenCell(row, column);
        }
    }

    return { playRound };

})();

// gameController.playRound();
// gameboard.printBoard();

// 1. ask for the name
// 2. create board
// 3. prompt for coords
// 4. check if we have a winner
// 5. check if it is a draw
// 6. repeat 3 - 5
// 7. print winner and update the score
// 8. ask if the user wants to play again or not
// 9. if not, update the page to show the winner of all games
//    in big flashy letters!