import { type Player } from "@/hooks/useGame"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface WinnerDialogProps {
  open: boolean
  winner: Player | null
  isDraw: boolean
  onPlayAgain: () => void
  onResetAll: () => void
}

export function WinnerDialog({
  open,
  winner,
  isDraw,
  onPlayAgain,
  onResetAll,
}: WinnerDialogProps) {
  return (
    <Dialog open={open}>
      <DialogContent showCloseButton={false} className="max-w-sm text-center">
        <DialogHeader>
          <div className="mb-2 flex justify-center">
            {isDraw ? (
              <span className="text-6xl">🤝</span>
            ) : (
              <span
                className={cn(
                  "text-7xl font-black",
                  winner === "X"
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-rose-600 dark:text-rose-400"
                )}
              >
                {winner}
              </span>
            )}
          </div>

          <DialogTitle className="text-2xl font-black">
            {isDraw ? "It's a Draw!" : `Player ${winner} Wins!`}
          </DialogTitle>

          <DialogDescription className="text-base">
            {isDraw
              ? "Great battle — nobody wins this round."
              : `Congratulations, Player ${winner}! 🎉`}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-2">
          <Button
            onClick={onPlayAgain}
            className={cn(
              "flex-1",
              winner === "X"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : winner === "O"
                  ? "bg-rose-600 text-white hover:bg-rose-700"
                  : ""
            )}
          >
            Play Again
          </Button>
          <Button variant="outline" onClick={onResetAll} className="flex-1">
            Reset Scores
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
