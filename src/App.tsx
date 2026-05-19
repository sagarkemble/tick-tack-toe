import { useGame } from "@/hooks/useGame"
import { useTheme } from "@/hooks/useTheme"
import { Board } from "@/components/board"
import { ScoreBoard } from "@/components/score-board"
import { MoveHistory } from "@/components/move-history"
import { WinnerDialog } from "@/components/winner-dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { RotateCcw, RefreshCw, Sun, Moon } from "lucide-react"

export default function App() {
  const {
    board,
    currentPlayer,
    winner,
    winningLine,
    isDraw,
    history,
    stepNumber,
    scores,
    makeMove,
    jumpTo,
    resetGame,
    resetAll,
  } = useGame()

  const { theme, toggle } = useTheme()

  const gameOver = !!winner || isDraw

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="flex w-full max-w-3xl flex-col gap-6">
        {/* Header */}
        <div className="relative space-y-1 text-center">
          <Button
            variant="outline"
            size="icon"
            onClick={toggle}
            className="absolute top-0 right-0"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </Button>

          <h1 className="text-4xl font-black tracking-tight">Tic-Tac-Toe</h1>
          <p className="text-sm text-muted-foreground">
            Two players, one board, endless rivalry
          </p>
        </div>

        <Separator />

        {/* Score Board — centered, width fit to content */}
        <div className="flex justify-center">
          <ScoreBoard
            scores={scores}
            currentPlayer={currentPlayer}
            winner={winner}
            isDraw={isDraw}
          />
        </div>

        {/* Main game area */}
        <div className="flex flex-col items-start justify-center gap-6 lg:flex-row">
          {/* Board */}
          <div className="flex flex-1 flex-col items-center gap-4">
            {!gameOver && (
              <p className="text-sm font-medium text-muted-foreground">
                Player{" "}
                <span
                  className={
                    currentPlayer === "X"
                      ? "font-bold text-blue-600 dark:text-blue-400"
                      : "font-bold text-rose-600 dark:text-rose-400"
                  }
                >
                  {currentPlayer}
                </span>{" "}
                — your turn
              </p>
            )}

            <Board
              board={board}
              winningLine={winningLine}
              onCellClick={makeMove}
              disabled={gameOver}
            />

            {/* Action buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={resetGame}
                className="gap-2"
              >
                <RotateCcw className="size-4" />
                New Game
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetAll}
                className="gap-2 text-muted-foreground"
              >
                <RefreshCw className="size-4" />
                Reset All
              </Button>
            </div>
          </div>

          {/* Move History */}
          <div className="w-full lg:w-52">
            <MoveHistory
              history={history}
              stepNumber={stepNumber}
              onJumpTo={jumpTo}
            />
          </div>
        </div>
      </div>

      {/* Winner / Draw popup */}
      <WinnerDialog
        open={gameOver}
        winner={winner}
        isDraw={isDraw}
        onPlayAgain={resetGame}
        onResetAll={resetAll}
      />
    </div>
  )
}
