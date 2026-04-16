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
            console.log(i)
            for (let j = 0; j < gameBoardArray.at(i).length ; j++) {
                console.log(j);
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

    return {getCells, setGameBoardCell, resetGameBoardArray, RenderGameBoard};
    
})(3);

const Player = (marker) => {
    const totalScore = 0;
    const gameScore = 0;
    const playerMarker = marker;



    const getTotalScore = () => {
        return totalScore;
    };

    const getGameScore = () => {
        return gameScore;
    };

    const getPlayerMarker = () => {
        return playerMarker;
    }

    return {getPlayerMarker, getGameScore, getTotalScore}

}

const Game = (() => {
    let endGame = false;
    let correctSelect = true;
    let playerTurn = 2;
    let actualMarker = "";
    const player1 = Player('X');
    const player2 = Player('O');

    const {getCells, setGameBoardCell, RenderGameBoard} = Gameboard;
    const cells = getCells();

    const setMarker = (cell, marker) => {
        const cellCoordinates = cell.id;
        let [xCord, yCord] = cellCoordinates
            .split('-')
            .map((coordinate) => parseInt(coordinate))
        correctSelect = setGameBoardCell(xCord, yCord, marker);
    }

    const playTurn = (cell) => {
        console.log(cell.id);
        if (playerTurn % 2 == 0) {
            actualMarker = player1.getPlayerMarker();
        }
        else {
            actualMarker = player2.getPlayerMarker();
        };
        
        setMarker(cell, actualMarker);
        RenderGameBoard();

        if (correctSelect) {
            playerTurn += 1
        };
    }

    cells.forEach( (cell) => {
        cell.addEventListener("click", () => {
            playTurn(cell);
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