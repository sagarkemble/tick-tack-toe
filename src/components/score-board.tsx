import { type Player } from "@/hooks/useGame"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface ScoreBoardProps {
  scores: Record<Player, number>
  currentPlayer: Player
  winner: Player | null
  isDraw: boolean
}

function PlayerCard({
  player,
  score,
  isActive,
  isWinner,
}: {
  player: Player
  score: number
  isActive: boolean
  isWinner: boolean
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 rounded-xl px-6 py-3 transition-all duration-300",
        isActive && !isWinner && "bg-muted ring-2 ring-offset-1",
        player === "X"
          ? isActive && !isWinner && "ring-blue-400"
          : isActive && !isWinner && "ring-rose-400",
        isWinner &&
          player === "X" &&
          "bg-blue-50 ring-2 ring-blue-500 dark:bg-blue-950/30",
        isWinner &&
          player === "O" &&
          "bg-rose-50 ring-2 ring-rose-500 dark:bg-rose-950/30"
      )}
    >
      <span
        className={cn(
          "text-3xl font-black",
          player === "X"
            ? "text-blue-600 dark:text-blue-400"
            : "text-rose-600 dark:text-rose-400"
        )}
      >
        {player}
      </span>
      <span className="text-2xl font-bold tabular-nums">{score}</span>
      {isWinner && (
        <Badge
          variant="default"
          className={cn(player === "X" ? "bg-blue-600" : "bg-rose-600")}
        >
          Winner!
        </Badge>
      )}
      {isActive && !isWinner && (
        <Badge variant="outline" className="text-xs">
          Turn
        </Badge>
      )}
    </div>
  )
}

export function ScoreBoard({
  scores,
  currentPlayer,
  winner,
  isDraw,
}: ScoreBoardProps) {
  return (
    <Card className="py-4">
      <CardContent className="px-4">
        <div className="flex items-center gap-2">
          <PlayerCard
            player="X"
            score={scores.X}
            isActive={!winner && !isDraw && currentPlayer === "X"}
            isWinner={winner === "X"}
          />
          <div className="flex flex-col items-center gap-1 px-2">
            <Separator orientation="vertical" className="h-8" />
            <span className="text-xs font-semibold text-muted-foreground">
              VS
            </span>
            <Separator orientation="vertical" className="h-8" />
          </div>
          <PlayerCard
            player="O"
            score={scores.O}
            isActive={!winner && !isDraw && currentPlayer === "O"}
            isWinner={winner === "O"}
          />
        </div>
        {isDraw && (
          <p className="mt-3 text-center text-sm font-semibold text-muted-foreground">
            It's a Draw!
          </p>
        )}
      </CardContent>
    </Card>
  )
}
