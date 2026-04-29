// 3 Objetos
// - Tablero

const Gameboard = ((numCells) => {
    // Se crea la constante del tablero
    let gameBoardArray = [];
    let gameBoardContainer = undefined;
    // Se incializan/resetean las celdas del gambeBoardArray

    const resetGameBoardArray = () => {
        gameBoardArray = Array(numCells)
        .fill(null)
        .map(() => {return Array(numCells)});
        console.log(gameBoardArray)
    }

    // Se renderiza el objeto del DOM
    // Se almacena en el id el índice de la matriz, así posteriormente
    // Se puede identificar rápido cuando se pulser una celda

    const createTitle = () => {
        const title = document.createElement("h1");
        title.setAttribute("id", "game-title");
        title.textContent = "Tic Tac Toe";
        return title;
    }

    const createScoreBoard = () => {
        const scoreBoard = document.createElement("div");
        scoreBoard.setAttribute("id", "scoreboard");
        const player1Board = document.createElement("div");
        player1Board.setAttribute("id", "player1-board");
        const player1Title = document.createElement("h2");
        player1Title.setAttribute("id", "player1-title");
        player1Title.textContent = "Player 1 [X]";
        const player1Score = document.createElement("p");
        player1Score.setAttribute("id", "player1-score");
        player1Score.textContent = "0";
        player1Board.appendChild(player1Title);
        player1Board.appendChild(player1Score);

 
        const player2Board = document.createElement("div");
        player2Board.setAttribute("id", "player2-board");
        const player2Title = document.createElement("h2");
        player2Title.setAttribute("id", "player2-title");
        player2Title.textContent = "Player 2 [O]";
        const player2Score = document.createElement("p");
        player2Score.setAttribute("id", "player2-score");
        player2Score.textContent = "0";
        player2Board.appendChild(player2Title);
        player2Board.appendChild(player2Score);



        scoreBoard.appendChild(player1Board);
        scoreBoard.appendChild(player2Board);
        return scoreBoard;
    }

    const createGameBoard = () => {
        const container = document.createElement('div');
        container.setAttribute("id", "gameboard-container");
        gameBoardContainer = container
        let cont = 0;
        for (let i = 0; i < gameBoardArray.length ; i++) {
            for (let j = 0; j < gameBoardArray.at(i).length ; j++) {
                const gameBoardCell = document.createElement('div');
                gameBoardCell.style.setProperty("flex", `1 1 ${100/numCells}%`);
                gameBoardCell.style.setProperty("height", `${100/numCells}%`);
                gameBoardCell.setAttribute("id", `${i}-${j}`);
                gameBoardCell.setAttribute("class", "cell");
                gameBoardCell.textContent = gameBoardArray[i][j]; 
                gameBoardContainer.appendChild(gameBoardCell);
                cont += 1;
                if (cont >= numCells**2) {
                    break;
                }
            }
        }

        return gameBoardContainer;
        
    }

    const createNewGameButton = () => {
        const button = document.createElement("button");
        button.setAttribute("id", "new-game");
        button.textContent = "New Game"

        return button;
    }

    const createLayout = () => {
        const body = document.querySelector("body");
        const title = createTitle();
        const gameBoardContainer = createGameBoard();
        const scoreBoard = createScoreBoard();
        const newGameButton = createNewGameButton();
        body.appendChild(title)
        body.appendChild(scoreBoard)
        body.appendChild(gameBoardContainer);
        body.appendChild(newGameButton);

    }

    resetGameBoardArray();
    createLayout();

    const cells = document.querySelectorAll("div.cell");
    const renderGameBoard = () => { 
        for (const cell of cells) {
            let [xCord, yCord] = cell.id
            .split('-')
            .map((coordinate) => parseInt(coordinate));
            cell.textContent = gameBoardArray[xCord][yCord];
        };
    }

    const setGameBoardCell = (i, j, marker) => {
        if (gameBoardArray[i][j] == null) {
            gameBoardArray[i][j] = marker;

            return true;
        };

        return false;
        
    };

    const getCells = () => {
        return cells;
    };

    const getGambeBoardArray = () => {
        return gameBoardArray
    };
    

    return {getCells, getGambeBoardArray, setGameBoardCell, createGameBoard, resetGameBoardArray, renderGameBoard};
    
})(3);

const Player = (marker) => {
    let playerScore = 0;
    const playerMarker = marker;

    const setPlayerScore = () => {
        playerScore += 1;
    };

    const getPlayerScore = () => {
        return playerScore;
    };

    const getPlayerMarker = () => {
        return playerMarker;
    }

    return {getPlayerMarker, getPlayerScore, setPlayerScore}

}

const Game = (() => {
    let player;
    let playerTurn = 2;
    let scoreID = 0;
    let endGame = false;
    let correctSelect = true;
    const player1 = Player('X');
    const player2 = Player('O');
    const {getCells, getGambeBoardArray, setGameBoardCell, createGameBoard, resetGameBoardArray, renderGameBoard} = Gameboard;
    const cells = getCells();
    const setMarker = (cell, marker) => {
        const cellCoordinates = cell.id;
        let [xCord, yCord] = cellCoordinates
            .split('-')
            .map((coordinate) => parseInt(coordinate))
        correctSelect = setGameBoardCell(xCord, yCord, marker);
    }

    const selectPlayer = () => {
        player = (playerTurn % 2 == 0) ? player1 : player2
    }

    const getCombinations = () => {
        // Extraemos filas
        const rows = getGambeBoardArray();
        let diagonal = [];
        let diagonalInv = [];

        let combinations = [];
        // Extraemos columnas y diagonales
        for (let i = 0; i < rows.length; i++) {
            // Combinación de filas
            combinations.push(rows[i]);
            // Combinación de columnas
            combinations.push(rows.map( x => x[i] ));
            diagonal.push(rows[i][i]);
            diagonalInv.push(rows[i][(rows.length-1)-i])
        }

        // Combinación de columnas
        combinations.push(diagonal);
        combinations.push(diagonalInv);

        return combinations
    }

    const isWinner = (marker) => {
        const combinations = getCombinations();
        const winnerCombination = JSON.stringify(Array(getGambeBoardArray().length).fill(marker));
        for (const combination of combinations) {
            if (JSON.stringify(combination) === winnerCombination) {
                return true
            }
        }
        return false
    }

    const playTurn = (cell) => {
        selectPlayer()
        setMarker(cell, player.getPlayerMarker());
        renderGameBoard();
        scoreID = (playerTurn % 2 == 0) ? "player1-score" : "player2-score";
        if (correctSelect) {
            playerTurn += 1
        };
    }

    const updatePlayerScore = () => {
        if (isWinner(player.getPlayerMarker())) {
            player.setPlayerScore();
            const playerScore = document.getElementById(scoreID);
            playerScore.textContent = player.getPlayerScore();
            console.log(`Player ${player.getPlayerMarker()} - Score: ${player.getPlayerScore()}`);
            endGame = true;
        }
    }
    
    cells.forEach( (cell) => {
        cell.addEventListener("click", () => {
            if (!endGame) {
                playTurn(cell);
                updatePlayerScore();
            }
        })

    });
    const button = document.getElementById("new-game");
    button.addEventListener("click",
        () => {
            resetGameBoardArray();
            createGameBoard();
            renderGameBoard();
            player;
            playerTurn = 2;
            endGame = false;
            correctSelect = true;
        }
    );

})()


// - Jugadores
// - Objeto de Control de Juego

// 1 Objeto
// - Renderizador: Mostrar la lógica en el DOM


// Utilizar factories lo mas que se puede
// Para objetos que se vayan a utilizar una vez utilizar IIFE

// Añadir lógica cuando alguien gana 3 en ralla
// Añadir lógica cuando hay empate
// Añadir lógica cuando el juego se ha terminado

// Añadir lógica para que el jugador añade marcas al tablero
// Añadir lógica para que el jugador no pueda marcar casillas ya marcadas

// Añadir lógica de limpieza
// Añadir start/restart
// Mostrar resultados   