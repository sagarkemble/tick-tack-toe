import { cn } from "@/lib/utils"
import { type Cell } from "@/hooks/useGame"
import { Button } from "@/components/ui/button"

interface BoardProps {
  board: Cell[]
  winningLine: number[]
  onCellClick: (index: number) => void
  disabled: boolean
}

function CellContent({ value }: { value: Cell }) {
  if (!value) return null
  return (
    <span
      className={cn(
        "text-4xl font-black transition-all duration-150 select-none",
        value === "X"
          ? "text-blue-600 dark:text-blue-400"
          : "text-rose-600 dark:text-rose-400"
      )}
    >
      {value}
    </span>
  )
}

export function Board({
  board,
  winningLine,
  onCellClick,
  disabled,
}: BoardProps) {
  return (
    <div className="mx-auto grid w-fit grid-cols-3 gap-2">
      {board.map((cell, i) => {
        const isWinning = winningLine.includes(i)
        return (
          <Button
            key={i}
            variant="outline"
            className={cn(
              "h-24 w-24 rounded-xl border-2 text-4xl font-bold transition-all duration-200",
              isWinning &&
                "scale-105 border-amber-400 bg-amber-50 shadow-md shadow-amber-200 dark:bg-amber-950/30 dark:shadow-amber-900",
              !cell &&
                !disabled &&
                "cursor-pointer hover:scale-105 hover:bg-muted/60",
              cell && "cursor-default"
            )}
            onClick={() => onCellClick(i)}
            disabled={!!cell || disabled}
          >
            <CellContent value={cell} />
          </Button>
        )
      })}
    </div>
  )
}
