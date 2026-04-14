// 3 Objetos
// - Tablero

const Gameboard = ((numCells) => {
    // Se crea la constante del tablero
    let gameBoardArray = [];
    let gameBoardContainer = undefined;
    // Se incializan/resetean las celdas del gambeBoardArray
    const ResetGameBoardArray = () => {
        gameBoardArray = Array(numCells)
        .fill(null)
        .map(() => {return Array(numCells)});
        console.log(gameBoardArray)
    }
    

    // Se crea el objeto del DOM
    const createGameBoardContainer = () => {
        const container = document.createElement('div');
        container.setAttribute("id", "gameboard-container");
        gameBoardContainer = container
    };

    const deleteGameBoardContainer = () => {
        const gameBoardContainer = document.getElementById("gameboard-container");
        gameBoardContainer.remove();
    }

    // Se renderiza el objeto del DOM
    // Se almacena en el id el índice de la matriz, así posteriormente
    // Se puede identificar rápido cuando se pulser una celda
    const createGameBoardCells = () => {
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
    }

    const displayGameBoard = () => {
        const body = document.querySelector("body");
        body.appendChild(gameBoardContainer)
    };

    const RenderGameBoard = () => {
        const gameBoardContainer = document.getElementById("gameboard-container");
        if(gameBoardContainer) {deleteGameBoardContainer()};
        createGameBoardContainer();
        createGameBoardCells();
        displayGameBoard();
    }
    
    const setGameBoardCell = (i, j, marker) => {
        const element = gameBoardArray[i][j];
        gameBoardArray[i][j] = marker;
    }

    // TODO Renderizado de una única celda para no recorrer toda la matriz


    ResetGameBoardArray();
    RenderGameBoard();
    // .map( (cell) => {
        // console.log(cell.id)
    // })

    return {setGameBoardCell, ResetGameBoardArray, RenderGameBoard};
    
})(3);

Gameboard.setGameBoardCell(1,1,'X');
Gameboard.RenderGameBoard()
Gameboard.setGameBoardCell(1,2,'O');
Gameboard.RenderGameBoard()

// const Player = (setGameBoardCell ,marker) => {
//     let score = 0;
    
//     const cells = document.querySelectorAll("div.cell");

//     cells.forEach( (cell) => {
//         cell.addEventListener("click", () => {
//             console.log(cell.id)
//             setMarker(cell, marker)
//         })

//     });

//     const setMarker = (cell, marker) => {
//         const cellCoordinates = cell.id;
//         let [xCord, yCord] = cellCoordinates
//             .split('-')
//             .map((coordinate) => parseInt(coordinate))
//         setGameBoardCell(xCord, yCord, marker);
//     }


// }

// Player(Gameboard.setGameBoardCell ,"X")
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