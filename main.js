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
    const createGameBoard = () => {
        const body = document.querySelector("body");
        const container = document.createElement('div');
        container.setAttribute("id", "gameboard-container");
        gameBoardContainer = container
        let cont = 0;
        for (let i = 0; i < gameBoardArray.length ; i++) {
            for (let j = 0; j < gameBoardArray.at(i).length ; j++) {
                const gameBoardCell = document.createElement('div');
                gameBoardCell.style.setProperty("flex", `1 1 ${100/numCells}%`);
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
        body.appendChild(gameBoardContainer);
    }

    resetGameBoardArray();
    createGameBoard();

    const cells = document.querySelectorAll("div.cell");
    const RenderGameBoard = () => { 
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

    return {getCells, getGambeBoardArray, setGameBoardCell, resetGameBoardArray, RenderGameBoard};
    
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
    let endGame = false;
    let correctSelect = true;
    let playerTurn = 2;
    const player1 = Player('X');
    const player2 = Player('O');
    let player;
    const {getCells, getGambeBoardArray, setGameBoardCell, RenderGameBoard} = Gameboard;
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
        RenderGameBoard();

        if (correctSelect) {
            playerTurn += 1
        };
    }

    const updatePlayerScore = () => {
        if (isWinner(player.getPlayerMarker())) {
            player.setPlayerScore();
            console.log(`Player ${player.getPlayerMarker()} - Score: ${player.getPlayerScore()}`);
        }
    }

    cells.forEach( (cell) => {
        cell.addEventListener("click", () => {
            playTurn(cell);
            updatePlayerScore();
        })

    });


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