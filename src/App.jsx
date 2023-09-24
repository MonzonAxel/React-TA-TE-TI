import { useState } from 'react'

function Square({ valor, squareClick }) {
  return (
    <button className="square" onClick={squareClick}>
      {valor}
    </button>
  );
}

//export hace que esta función sea accesible fuera de este archivo.
export default function Board() {
  //xSigVal es un estado booleano que indica si es el turno de "X" (true) o "O" (false).
  const [xSigVal, setSigVal] = useState(true);

  //cuadrado es un estado que representa los cuadrados del tablero del juego.
  const [cuadrado, setCuadrado] = useState(Array(9).fill(null));

  function handleClick(i) {
    //Si hay un ganador , impermite seguir escribiendo en las grillas o
    //Si cuadrado del tablero tiene X impermite sobreescribir con O y viceversa.
    
    if (calculateWinner(cuadrado) || cuadrado[i]) {
      return;
    }
    const nextSquare = cuadrado.slice();
    if (xSigVal) {
      nextSquare[i] = "X";
    } else {
      nextSquare[i] = "O";
    }
    // Llama a setCuadrado,actualiza el estado del componente con el nuevo array nextSquares.
    setCuadrado(nextSquare);
    // Llama a setSigVal para alternar el turno entre "X" y "O"., mediante !xSigVal.
    setSigVal(!xSigVal);
  }

  // Guardo el ganaor en la variable
  const winner = calculateWinner(cuadrado);
  const empate = esEmpate(cuadrado);
  let status;
  // imprimo el ganador
  if (winner) {
    status = winner;
  } else if (empate) {
    status = empate;
  } else {
    status = "Siguiente jugador: " + (xSigVal ? "X" : "O");
  }

  function reiniciarJuego() {
    setCuadrado(Array(9).fill(null)); // Restablece el estado del tablero
    setSigVal(true); // Restablece el turno a "X"
  }

  return (
    <>
      <div className="board-row margen">{status}</div>
      <div className="board-row">
        <Square valor={cuadrado[0]} squareClick={() => handleClick(0)}></Square>
        <Square valor={cuadrado[1]} squareClick={() => handleClick(1)}></Square>
        <Square valor={cuadrado[2]} squareClick={() => handleClick(2)}></Square>
      </div>
      <div className="board-row">
        <Square valor={cuadrado[3]} squareClick={() => handleClick(3)}></Square>
        <Square valor={cuadrado[4]} squareClick={() => handleClick(4)}></Square>
        <Square valor={cuadrado[5]} squareClick={() => handleClick(5)}></Square>
      </div>
      <div className="board-row">
        <Square valor={cuadrado[6]} squareClick={() => handleClick(6)}></Square>
        <Square valor={cuadrado[7]} squareClick={() => handleClick(7)}></Square>
        <Square valor={cuadrado[8]} squareClick={() => handleClick(8)}></Square>
      </div>
      <button className="reinicio" onClick={reiniciarJuego}>Reiniciar Juego</button>
    </>
  );
}

function calculateWinner(cuadrado) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      cuadrado[a] &&
      cuadrado[a] === cuadrado[b] &&
      cuadrado[a] === cuadrado[c]
    ) {
      return ` El ganador es ${cuadrado[a]}`;
    }
  }
  return null;
}

function esEmpate(cuadrado) {
  for (let i = 0; i < cuadrado.length; i++) {
    if (cuadrado[i] === null) {
      // Todavía hay una casilla vacía, no es un empate
      return false;
    }
  }
  // Todas las casillas están ocupadas, es un empate
  return ` Juego empatado `;
}