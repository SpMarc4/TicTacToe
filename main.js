// 3 Objetos
// - Tablero

const Gameboard = ((numCells) => {
    // Se crea la constante del tablero
    let gameBoardArray = [];

    // Se incializan/resetean las celdas del gambeBoardArray
    const ResetGameBoardArray = (numCells) => {
        gameBoardArray = Array(numCells).fill(Array(numCells).fill(""));
        console.log(gameBoardArray)
    }
    

    // Se crea el objeto del DOM
    const createGameBoardContainer = () => {
        const gameBoardContainer = document.createElement('div');
        gameBoardContainer.setAttribute("id", "gameboard-container");
        return gameBoardContainer
    };


    // Se renderiza el objeto del DOM
    // Se almacena en el id el índice de la matriz, así posteriormente
    // Se puede identificar rápido cuando se pulser una celda
    const RenderGameBoardCells = (container, gameBoardArray) => {
        let cont = 0;
        for (let i = 0; i < gameBoardArray.length ; i++) {
            console.log(i)
            for (let j = 0; j < gameBoardArray.at(i).length ; j++) {
                console.log(j);
                const gameBoardCell = document.createElement('div');
                gameBoardCell.style.setProperty("flex", `1 1 ${100/numCells}%`);
                gameBoardCell.setAttribute("id", `${i}-${j}`);
                gameBoardCell.setAttribute("class", "cell");
                gameBoardCell.textContent = String(gameBoardArray.at(i).at(j)); 
                container.appendChild(gameBoardCell);
                cont += 1;
                if (cont >= numCells**2) {
                    break;
                }
            }
        }
    }
    
    const setGameBoardCell = (i, j, marker) => {
        gameBoardArray.at(i).at(j) = marker;
    }


    const getGameBoardCell = () => {

    }
    // TODO Renderizado de una única celda para no recorrer toda la matriz


    const displayGameBoard = (container) => {
        const body = document.querySelector("body");
        body.appendChild(container)
    };

    const container = createGameBoardContainer();
    ResetGameBoardArray(numCells);
    RenderGameBoardCells(container, gameBoardArray);

    // .map( (cell) => {
        // console.log(cell.id)
    // })
    displayGameBoard(container);
    
    const celulas = document.querySelectorAll("div.cell");

    // Revisar

    celulas.forEach( (cell) => {
        cell.addEventListener("click", function sendGameBoardCell () {
            console.log(cell.id)
            return cell.id;
        })

    })


    return {sendGameBoardCell, setGameBoardCell, ResetGameBoardArray, RenderGameBoardCells};
    
})(3);

const Player = (marker) => {
    let score = 0;

    const getCell = () => {

    }

    const setMarker = (marker) => {

    }

}
console.log(typeof Gameboard)
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