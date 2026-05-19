import { type Board } from "@/hooks/useGame"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface MoveHistoryProps {
  history: Board[]
  stepNumber: number
  onJumpTo: (step: number) => void
}

export function MoveHistory({
  history,
  stepNumber,
  onJumpTo,
}: MoveHistoryProps) {
  return (
    <Card>
      <CardHeader className="px-4 pt-4 pb-2">
        <CardTitle className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
          Move History
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 pb-4">
        <ScrollArea className="h-48 pr-2">
          <div className="flex flex-col gap-1">
            {history.map((_, move) => (
              <Button
                key={move}
                variant={stepNumber === move ? "default" : "ghost"}
                size="sm"
                className="h-8 justify-start text-sm"
                onClick={() => onJumpTo(move)}
              >
                {move === 0
                  ? "Game start"
                  : `Move #${move} — ${move % 2 === 1 ? "X" : "O"} played`}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
