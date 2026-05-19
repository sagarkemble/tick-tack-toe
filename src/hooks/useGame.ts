import { useState, useCallback } from "react"

export type Player = "X" | "O"
export type Cell = Player | null
export type Board = Cell[]

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function calculateWinner(
  board: Board
): { winner: Player; line: number[] } | null {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, line: [a, b, c] }
    }
  }
  return null
}

function isDraw(board: Board): boolean {
  return board.every((cell) => cell !== null) && !calculateWinner(board)
}

export interface GameState {
  board: Board
  currentPlayer: Player
  winner: Player | null
  winningLine: number[]
  isDraw: boolean
  history: Board[]
  stepNumber: number
  scores: Record<Player, number>
}

export function useGame() {
  const [scores, setScores] = useState<Record<Player, number>>({ X: 0, O: 0 })
  const [history, setHistory] = useState<Board[]>([Array(9).fill(null)])
  const [stepNumber, setStepNumber] = useState(0)
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X")

  const board = history[stepNumber]
  const result = calculateWinner(board)
  const draw = isDraw(board)

  const makeMove = useCallback(
    (index: number) => {
      if (board[index] || result) return

      const newBoard = board.slice() as Board
      newBoard[index] = currentPlayer

      const newHistory = history.slice(0, stepNumber + 1).concat([newBoard])
      setHistory(newHistory)
      setStepNumber(newHistory.length - 1)

      const newResult = calculateWinner(newBoard)
      if (newResult) {
        setScores((prev) => ({
          ...prev,
          [newResult.winner]: prev[newResult.winner] + 1,
        }))
      }

      setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
    },
    [board, result, currentPlayer, history, stepNumber]
  )

  const jumpTo = useCallback((step: number) => {
    setStepNumber(step)
    setCurrentPlayer(step % 2 === 0 ? "X" : "O")
  }, [])

  const resetGame = useCallback(() => {
    setHistory([Array(9).fill(null)])
    setStepNumber(0)
    setCurrentPlayer("X")
  }, [])

  const resetAll = useCallback(() => {
    setHistory([Array(9).fill(null)])
    setStepNumber(0)
    setCurrentPlayer("X")
    setScores({ X: 0, O: 0 })
  }, [])

  return {
    board,
    currentPlayer,
    winner: result?.winner ?? null,
    winningLine: result?.line ?? [],
    isDraw: draw,
    history,
    stepNumber,
    scores,
    makeMove,
    jumpTo,
    resetGame,
    resetAll,
  }
}
