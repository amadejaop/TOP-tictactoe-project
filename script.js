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

    function emptyBoard() {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                board[i][j] = "";
            }
        }
    }

    function getBoard() {
        return board;
    }

    function chosenCellEmpty(row, column) {
        return (board[row][column] === "");
    }

    function markChosenCell(row, column, symbol) {
        board[row][column] = symbol;
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

    return { boardFull, emptyBoard, checkWinner, chosenCellEmpty, createBoard, markChosenCell, getBoard };
})();

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
    }

    function getPlayersList() {
        return playersList;
    }

    return { askForPlayerName,  createPlayer, getPlayersList };
})();

const gameController = (function () {
    const listOfPlayers = players.getPlayersList();

    function playTurn(event) { 
        let index = event.target.playerIndex - 1;
        let gameOver = false;
        
        if (gameboard.chosenCellEmpty(event.target.row, event.target.column)) {
            gameboard.markChosenCell(event.target.row, event.target.column, listOfPlayers[index].symbol);
            viewController.displayBoard();
            gameboard.checkWinner(listOfPlayers[0]);
            gameboard.checkWinner(listOfPlayers[1]);

            if (gameboard.boardFull()) {
                if (listOfPlayers[0].winner) {
                    viewController.displayMessage(listOfPlayers[0].name + " wins!");
                    gameOver = viewController.stopGame();
                    viewController.displayPlayerScores(listOfPlayers[0].score, listOfPlayers[1].score);
                } else if (listOfPlayers[1].winner) {
                    viewController.displayMessage(listOfPlayers[1].name + " wins!");
                    viewController.displayPlayerScores(listOfPlayers[0].score, listOfPlayers[1].score);
                    gameOver = viewController.stopGame();
                } else {
                    viewController.displayMessage("It's a draw!");
                    gameOver = viewController.stopGame();
                }
            } else {
                if (listOfPlayers[0].winner) {
                    viewController.displayMessage(listOfPlayers[0].name + " wins!");
                    viewController.displayPlayerScores(listOfPlayers[0].score, listOfPlayers[1].score);
                    gameOver = viewController.stopGame();
                } else if (listOfPlayers[1].winner) {
                    viewController.displayMessage(listOfPlayers[1].name + " wins!");
                    viewController.displayPlayerScores(listOfPlayers[0].score, listOfPlayers[1].score);
                    gameOver = viewController.stopGame();
                }
            }
        } else {
            return;
        }
        (event.target.playerIndex === 1) ? viewController.updatePlayerIndex(2) : viewController.updatePlayerIndex(1);
        if (!gameOver) {
            viewController.displayMessage("It's " + listOfPlayers[event.target.playerIndex - 1].name + "'s turn.");
        }    
    }

    function checkFinalWinner() {
        if (listOfPlayers[0].score === listOfPlayers[1].score) {
            return "";
        } else if (listOfPlayers[0].score > listOfPlayers[1].score) {
            return listOfPlayers[0];
        } else {
            return listOfPlayers[1];
        }
    }

    return { playTurn, checkFinalWinner };
})();

const viewController = (function () {
    const cells = document.getElementsByClassName("cell");
    const playerOneName = document.querySelector("#player-one-name");
    const playerTwoName = document.querySelector("#player-two-name");
    const playerOneScore = document.querySelector("#player-one-score");
    const playerTwoScore = document.querySelector("#player-two-score");
    const messages = document.querySelector("#messages");
    const playAgainDiv = document.querySelector("#play-again");
    const yesButton = document.querySelector("#yes");
    const noButton = document.querySelector("#no");
    const scoreboard = document.querySelector("#scoreboard");
    const table = document.querySelector("table");
    const body = document.querySelector("body");

    yesButton.addEventListener("click", playRound);
    noButton.addEventListener("click", displayFinalWinner);
    
    let currentBoard = gameboard.getBoard();

    function addEventsToCells() {
        let l = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                cells[l].row = i;
                cells[l].column = j;
                cells[l].playerIndex = 1;
                // store the anonymous function inside the fn property of the element:
                cells[l].addEventListener("click",cells[l].fn=function(event) {
                    gameController.playTurn(event);
                });
                l++;
            }
        }
    }

    function updatePlayerIndex(newIndex) {
        for (const cell of cells) {
            cell.playerIndex = newIndex;
        }
    }
    
    function displayBoard() {
        let k = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                cells[k].textContent = currentBoard[i][j];
                k++;
            }
        }
    }

    function displayPlayerNames(name1, name2) {
        playerOneName.textContent = name1;
        playerTwoName.textContent = name2;
    }

    function displayPlayerScores(score1, score2) {
        playerOneScore.textContent = score1;
        playerTwoScore.textContent = score2;
    }

    function displayMessage(message) {
        messages.textContent = message;
    }

    function stopGame() {
        for (const cell of cells) {
            cell.removeEventListener("click", cell.fn);
        }
        showAgainPrompt();
        return true;
    }

    function showAgainPrompt() {
        playAgainDiv.style.visibility = "visible";
    }

    function hideAgainPrompt() {
        playAgainDiv.style.visibility = "hidden";
    }

    function displayFinalWinner() {
        let colors = ["#E0BBE4", "#FFDFD3", "#FEC8D8", "#BBE2EE", "#CEE9AE", "#FBD1AC", "#FAE9B0"];
        let colorIndex = Math.floor(Math.random() * 7);

        scoreboard.style.display = "none";
        table.style.display = "none";
        playAgainDiv.style.display = "none";
        messages.style.fontSize = "2.2rem";
        body.style.backgroundColor = colors[colorIndex];
        let finalWinner = gameController.checkFinalWinner();
        if (finalWinner === "") {
            messages.textContent = "Both players got the same score!"
        } else {
            messages.textContent = ("The final winner is " + finalWinner.name + " with a score of " + finalWinner.score + "!");
        }
    }

    return { displayBoard, addEventsToCells, stopGame, displayPlayerNames, displayPlayerScores, showAgainPrompt, hideAgainPrompt, displayMessage, updatePlayerIndex };
})();



function playGame() {
    // code for the first time players play the game
    players.askForPlayerName();
    const listOfPlayers = players.getPlayersList();
    viewController.displayPlayerNames(listOfPlayers[0].name, listOfPlayers[1].name);
    viewController.displayPlayerScores(listOfPlayers[0].score, listOfPlayers[1].score);
    gameboard.createBoard();
    viewController.displayBoard();
    viewController.displayMessage("It's " + listOfPlayers[0].name + "'s turn.");
    playRound();
}

function playRound() {
    viewController.hideAgainPrompt();
    const listOfPlayers = players.getPlayersList();
    listOfPlayers[0].winner = false;
    listOfPlayers[1].winner = false;
    gameboard.emptyBoard();
    viewController.displayBoard();
    viewController.addEventsToCells();
    viewController.displayMessage("It's " + listOfPlayers[0].name + "'s turn.");
}

playGame();