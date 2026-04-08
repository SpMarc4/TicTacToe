// 3 Objetos
// - Tablero

const gameBoard = ((numCells) => {

    console.log("Entro");
    const createGameBoardContainer = () => {
        const gameBoardContainer = document.createElement('div');
        console.log("Entro en la creación del gameboard");
        gameBoardContainer.setAttribute("id", "gameboard-container");
        return gameBoardContainer
    };
    
    const createGameBoardCells = (container, numCells) => {
        for (let i = 1; i <= numCells**2; i++) {
            console.log(i)
            const gameBoardCell = document.createElement('div');
            gameBoardCell.style.setProperty("flex", `1 1 ${100/numCells}%`);
            gameBoardCell.setAttribute("class", "cell");
            
            container.appendChild(gameBoardCell);
            if (i>=10) {
                break;
            }
        }   
    }

    const displayGameBoard = (container) => {
        const body = document.querySelector("body");
        body.appendChild(container)
    };

    const container = createGameBoardContainer();
    createGameBoardCells(container, numCells);
    displayGameBoard(container);
})(3);

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