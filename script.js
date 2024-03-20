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
        board[row][column] = player.symbol;
    }

    function boardFull() {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                if (board[i][j] === "") {
                    return false;
                }
            }
        }
        return true;
    }

    function checkWinner(player) {
        // horizontal win
        for (let i = 0; i < rows; i++) {
            if (board[i][0] === player.symbol && board[i][1] === player.symbol && board[i][2] === player.symbol) {
                player.winner = true;
                player.score++;
                return true;
            }
        }

        // vertical win
        for (let i = 0; i < rows; i++) {
            if (board[0][i] === player.symbol && board[1][i] === player.symbol && board[2][i] === player.symbol) {
                player.winner = true;
                player.score++;
                return true;
            }
        }

        // diagonal win
        if ((board[0][0] === player.symbol && board[1][1] === player.symbol && board[2][2] === player.symbol) || (board[2][0] === player.symbol && board[1][1] === player.symbol && board[0][2] === player.symbol)) {
            player.winner = true;
            player.score++;
            return true;
        }

        return false;
    }

    return { boardFull, checkWinner, chosenCellEmpty, createBoard, printBoard, markChosenCell };
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
        playersList.push({ name, symbol, score: 0, winner: false });
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
    
    function generateRandomNumber() {
        return (Math.floor(Math.random() * 2));
    }

    function playRound(player) {
        let row;
        let column;
        do {
            row = prompt("Select row (0-2):");
            column = prompt("Select column (0-2)");
        } while (row > 2 || row < 0 || column > 2 || column < 0)
        

        if (gameboard.chosenCellEmpty(row, column)) {
            gameboard.markChosenCell(row, column, player);
        } else {
            playRound(player);
        }
    }

    function swapPlayers(number) {
        if (number === 0) {
            return 1;
        }
        return 0;
    }

    return { playRound, generateRandomNumber, swapPlayers };
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

function playGame() {
    players.askForPlayerName();
    const listOfPlayers = players.getPlayersList();

    let playAgain = "";

    do {
        gameboard.createBoard();
        gameboard.printBoard();

        let firstPlayer = gameController.generateRandomNumber();
        console.log("It's " + listOfPlayers[firstPlayer].name + "'s turn.");
        gameController.playRound(listOfPlayers[firstPlayer]);
        gameboard.printBoard();

        let index = firstPlayer;

        while (!gameboard.boardFull()){
            index = gameController.swapPlayers(index);
            console.log("It's " + listOfPlayers[index].name + "'s turn.");
            gameController.playRound(listOfPlayers[index]);
            gameboard.printBoard();
            if (gameboard.checkWinner(listOfPlayers[0])) {
                console.log(listOfPlayers[0].name + " wins!");
                break;
            } else if (gameboard.checkWinner(listOfPlayers[1])) {
                console.log(listOfPlayers[1].name + " wins!");
                break;
            }
        }
        if (gameboard.boardFull()) {
            if (gameboard.checkWinner(listOfPlayers[0])) {
                console.log(listOfPlayers[0].name + " wins!");
            } else if (gameboard.checkWinner(listOfPlayers[1])) {
                console.log(listOfPlayers[1].name + " wins!");
            } else {
                console.log("It's a draw!");
            }
        }
        console.log(listOfPlayers[0].score);
        console.log(listOfPlayers[1].score);


        playAgain = prompt("Play again? (y / n)");
    } while (playAgain.toLowerCase() === "y")

}

playGame();