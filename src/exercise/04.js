// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageState} from '../utils.js'

function Board({squares, onClick}) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  const [squares, setSquares] = useLocalStorageState('squares', init)
  let moves = squares.map((elem, i) => i)
  let currentSquares = squares[squares.length - 1]
  let nextValue = calculateNextValue(currentSquares)
  let winner = calculateWinner(currentSquares)
  // console.log('winner:', winner)
  let status = calculateStatus(winner, currentSquares, nextValue)
  // console.log('status:', status)
  function selectSquare(square) {
    if (winner || currentSquares[square]) return
    let squaresCopy = [...squares]
    let currentSquaresCopy = [...currentSquares]
    currentSquaresCopy[square] = nextValue
    squaresCopy.push(currentSquaresCopy)
    setSquares(squaresCopy)
  }
  function init() {
    let start = []
    start.push(Array(9).fill(null))
    return start
  }
  function restart() {
    setSquares(init())
  }
  function moveTo(move) {
    let squaresCopy = squares.slice(0, move)
    setSquares(squaresCopy)
  }
  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={currentSquares} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <ol>
          {moves
            .filter((elem, i) => i != 0)
            .map(i => (
              <li key={i}>
                <button onClick={() => moveTo(i)}>Go to Move #{i}</button>
              </li>
            ))}
        </ol>
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
